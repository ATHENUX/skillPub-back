import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createToken } from "helpers/assistant.helpers";
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";
import Users from "models/users.model";
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import { constants } from "helpers/constants";
import cloudinary from "config/cloudinary.config";
import { removeFile } from "helpers/assistant.helpers";
import path from "path";

const client = new OAuth2Client(
  "920347174932-jom43a4j0cqa05rgjri2pvo0nrcogvhm.apps.googleusercontent.com"
);

class User {
  public async getUser(req: Request, res: Response): Promise<Response> {
    const decoded = (<any>req)["decoded"];
    const { id } = req.body;

    if (id) {
      try {
        const user = await Users.findOne({ _id: id }).populate("listOfAptitudes");
        return res.json({ success: true, user });
      } catch (error) {
        return res.json({ success: false, error });
      }
    }
    return res.json({ success: true, user: decoded });
  }

  public async signIn(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json({ success: false, errors: errors.array() });

    const { email, password } = req.body;
    const user: any = await Users.findOne({ email: email });
    if (user == null) {
      return res.json({ success: false, message: "Email not found" });
    }
    const verifyPassword = await user.matchPassword(password);
    if (!verifyPassword) return res.json({ success: false, message: "Incorrect password" });

    const token = createToken(user._id);

    return res.json({ success: true, message: "Successfully", token });
  }

  public async signUp(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json({ success: false, errors: errors.array() });

    const { email, firstName, lastName } = req.body;
    const findEmail = await Users.findOne({ email });
    if (findEmail !== null) {
      return res.json({ success: false, message: "Email is already registered" });
    }

    const password = email + Math.floor(Math.random() * (50 - 5)) + 5;

    const newUser: any = new Users({
      email,
      password,
      firstName,
      lastName,
    });

    newUser.password = await newUser.encryptPassword(newUser.password);
    const user = await newUser.save();

    const token = createToken(user._id);

    return res.json({ success: true, message: "User registered", token });
  }

  public async googleAccess(req: Request, res: Response): Promise<Response> {
    const { tokenId, validateAccess }: { tokenId: string; validateAccess: string } = req.body;

    try {
      const resClient: any = await client.verifyIdToken({
        idToken: tokenId,
        audience: "920347174932-jom43a4j0cqa05rgjri2pvo0nrcogvhm.apps.googleusercontent.com",
      });
      const { email_verified, email, given_name, family_name, picture } = resClient.payload;
      if (email_verified) {
        const userFind = await Users.findOne({ email: email });

        if (validateAccess === "signIn") {
          if (userFind !== null) {
            const token = createToken(userFind._id);
            return res.json({ success: true, message: "User found", token });
          }
          return res.json({ success: false, message: "Email not found" });
        }

        if (userFind !== null) {
          return res.json({ success: false, message: "Email is already registered" });
        }
        const password = email + Math.floor(Math.random() * (50 - 5)) + 5;

        const newUser: any = new Users({
          email,
          password,
          firstName: given_name,
          lastName: family_name,
          avatar: picture,
        });

        newUser.password = await newUser.encryptPassword(newUser.password);
        const user = await newUser.save();
        const token = createToken(user._id);

        return res.json({ success: true, message: "User registered", token });
      } else {
        return res.json({ success: false, message: "Unverified email" });
      }
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public async facebookAccess(req: Request, res: Response): Promise<Response> {
    const { userId, accessToken, validateAccess } = req.body;
    const urlGraphFacebook = `https://graph.facebook.com/v3.3/${userId}/?fields=id,name,email&access_token=${accessToken}`;

    try {
      const response = await fetch(urlGraphFacebook, {
        method: "GET",
      });

      const facebookResponse = await response.json();

      const { email, name } = facebookResponse;

      const userFind: any = await Users.findOne({ email: email });

      if (validateAccess === "signIn") {
        if (userFind !== null) {
          const token = createToken(userFind._id);
          return res.json({ success: true, message: "User found", token });
        }
        return res.json({ success: false, message: "Email not found" });
      }

      if (userFind !== null) {
        return res.json({ success: false, message: "Email is already registered" });
      }

      const password = email + Math.floor(Math.random() * (50 - 5)) + 5;
      const newUser: any = new Users({
        email,
        password,
        firstName: name,
        lastName: " ",
      });

      newUser.password = await newUser.encryptPassword(newUser.password);
      const user = await newUser.save();
      const token = createToken(user._id);

      return res.json({ success: true, message: "User registered", token });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public async assignAptitudes(req: Request, res: Response): Promise<Response> {
    const { listAptitudes } = req.body;
    const decoded = (<any>req)["decoded"]._id;

    try {
      await Users.findOneAndUpdate({ _id: decoded._id }, { listOfAptitudes: listAptitudes });
      return res.json({ success: true, message: "Successfully" });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public validateAccessToken(req: Request, res: Response): Response {
    try {
      const { token } = req.body;
      let err = false;
      jwt.verify(
        token,
        process.env.TOKENJWT!,
        function (error: JsonWebTokenError | NotBeforeError | TokenExpiredError | null) {
          if (error) {
            err = true;
          }
        }
      );

      if (err) {
        return res.json({
          message: "Error verifying token",
          success: false,
          status: constants.httpCodes.unauthorized,
        });
      }
      return res.json({ success: true, message: "Valid token" });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public async updateUserSettings(req: Request, res: Response): Promise<Response> {
    const decoded = (<any>req)["decoded"]._id;
    const { password, phone, dateOfBirth, location, gender } = req.body;

    const data: any = {
      dateOfBirth,
      location,
      gender,
      phone,
      password,
    };

    try {
      const updateUser: any = await Users.findOne({ _id: decoded });
      data.password = await updateUser.encryptPassword(req.body.password);

      await Users.updateOne({ _id: decoded }, { ...data });

      return res.json({ success: true, message: "Updated user" });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public async updateUserState(req: Request, res: Response): Promise<Response> {
    const decoded = (<any>req)["decoded"]._id;
    try {
      const user: any = await Users.findOneAndUpdate(
        { _id: decoded },
        { state: "settings completed" },
        { new: true }
      );

      return res.json({ success: true, message: "User state updated", user });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public async follow(req: Request, res: Response): Promise<Response> {
    const decoded = (<any>req)["decoded"];
    const { id } = req.body;

    try {
      //This request will add the id of the user who was followed
      await Users.updateOne({ _id: decoded._id }, { $push: { following: id } });
      //while this one is going to add to the user its new follower
      await Users.updateOne({ _id: id }, { $push: { follower: decoded._id } });

      return res.json({ success: true, message: "Successfully" });
    } catch (error) {
      return res.json({ success: false, message: "Error could not add followers" });
    }
  }

  public async unfollow(req: Request, res: Response): Promise<Response> {
    const decoded = (<any>req)["decoded"];
    const { id } = req.body;

    try {
      //This request will remove the identification of the user who was followed
      await Users.updateOne({ _id: decoded._id }, { $pull: { following: id } });
      //while this will delete the user his old follower
      await Users.updateOne({ _id: id }, { $pull: { follower: decoded._id } });

      return res.json({ success: true, message: "Successfully" });
    } catch (error) {
      return res.json({ success: false, message: "Error could not add followers" });
    }
  }

  public async searchUserByName(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    try {
      const users: any = await Users.find(
        { firstName: { $regex: `.*${name}.*` } },
        "firstName lastName avatar _id"
      );
      return res.json({ success: true, users });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public async updateBanner(req: Request, res: Response): Promise<Response> {
    const decoded = (<any>req)["decoded"]._id;
    try {
      if (req.file.size > 1000000) {
        removeFile(req.file.path);
        return res.json({ success: false, message: "File too large" });
      }
      let ext: any = path.extname(req.file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        removeFile(req.file.path);
        return res.json({ success: false, message: "Invalid extension" });
      }
      const user: any = await Users.findById(decoded);
      let publicId: any;
      if (user.banner === undefined || user.banner === null) {
        await cloudinary.uploader.upload(
          req.file.path,
          { upload_preset: "dev_setups" },
          (err: any, result: any) => {
            publicId = result.public_id;
          }
        );
        const userUpdated = await Users.findOneAndUpdate(
          { _id: decoded },
          { banner: publicId },
          { new: true }
        );
        removeFile(req.file.path);
        return res.json({ success: true, message: "Successfully added banner", userUpdated });
      } else {
        const cloudRes = await cloudinary.uploader.destroy(
          user.banner,
          (error: any, result: any) => {
            console.log(result, error);
          }
        );
        if (cloudRes.result === "ok") {
          await cloudinary.uploader.upload(
            req.file.path,
            { upload_preset: "dev_setups" },
            (err: any, result: any) => {
              publicId = result.public_id;
            }
          );
          const userUpdated = await Users.findOneAndUpdate(
            { _id: decoded },
            { banner: publicId },
            { new: true }
          );
          removeFile(req.file.path);
          return res.json({ success: true, message: "Successfully updated banner", userUpdated });
        } else {
          removeFile(req.file.path);
          return res.json({ success: false, message: "Error while uploading image to cloudinary" });
        }
      }
    } catch (error) {
      removeFile(req.file.path);
      return res.json({ success: false, error });
    }
  }

  public async updateProfilePhoto(req: Request, res: Response): Promise<Response> {
    const decoded = (<any>req)["decoded"];
    try {
      console.log(req.file);
      if (req.file.size > 1000000) {
        removeFile(req.file.path);
        return res.json({ success: false, message: "File too large" });
      }
      let ext: any = path.extname(req.file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        removeFile(req.file.path);
        return res.json({ success: false, message: "Invalid extension" });
      }
      const user: any = await Users.findById(decoded);
      let publicId: any;
      if (user.avatar === undefined || user.avatar === null) {
        await cloudinary.uploader.upload(
          req.file.path,
          { upload_preset: "dev_setups" },
          (err: any, result: any) => {
            publicId = result.public_id;
          }
        );
        const userUpdated = await Users.findOneAndUpdate(
          { _id: decoded },
          { avatar: publicId },
          { new: true }
        );
        removeFile(req.file.path);
        return res.json({ success: true, message: "Successfully added avatar", userUpdated });
      } else {
        if (user.avatar.includes("development/")) {
          const cloudRes = await cloudinary.uploader.destroy(
            user.avatar,
            (error: any, result: any) => {
              console.log(result, error);
            }
          );
          if (cloudRes.result === "ok") {
            await cloudinary.uploader.upload(
              req.file.path,
              { upload_preset: "dev_setups" },
              (err: any, result: any) => {
                publicId = result.public_id;
              }
            );
            const userUpdated = await Users.findOneAndUpdate(
              { _id: decoded },
              { banner: publicId },
              { new: true }
            );
            removeFile(req.file.path);
            return res.json({
              success: true,
              message: "Successfully updated profile photo",
              userUpdated,
            });
          } else {
            removeFile(req.file.path);
            return res.json({
              success: false,
              message: "Error while uploading image to cloudinary",
            });
          }
        } else {
          removeFile(req.file.path);
          return res.json({
            success: false,
            message: "Profile picture taken either from Google or Facebook",
          });
        }
      }
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public async updateMainInfo(req: Request, res: Response): Promise<Response> {
    const decoded = (<any>req)["decoded"]._id;
    const { firstName, lastName, description, phone } = req.body;
    try {
      const userUpdated = await Users.findOneAndUpdate(
        { _id: decoded },
        {
          firstName,
          lastName,
          description,
          phone,
        },
        { new: true }
      );
      return res.json({ success: true, message: "Main info updated", userUpdated });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }
}

const user = new User();

export default user;
