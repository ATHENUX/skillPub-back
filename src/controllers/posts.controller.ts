import { Request, Response } from "express";
import { validationResult } from "express-validator";
import cloudinary from "config/cloudinaryConfig";
import Posts from "models/posts.model";
import fse from "fs-extra";

class Post {
  public async addPost(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.json({ success: false, errors: errors.array() });

      if (req.files === undefined || req.files === null) {
        return res.json({ success: false, message: "There are not files" });
      }

      let imagePaths: any = (<any>req).files.map((file: any) => file.path);

      const uploadedResponses: any = [];

      for (const filePath of imagePaths) {
        await cloudinary.uploader.upload(
          filePath,
          {
            upload_preset: "dev_setups",
          },
          (err: any, result: any) => {
            let public_url: any = result.url;
            console.log(public_url);
            uploadedResponses.push(public_url);
          }
        );
      }

      const { bodyContent } = req.body;

      const newPost: any = new Posts({
        bodyContent,
        thumbnailsList: uploadedResponses,
      });

      const post: any = await newPost.save();

      for (const filePath of imagePaths) {
        fse.remove(filePath, (err: any) => {
          if (err) {
            return console.log(err);
          }
          console.log(`${filePath} has been removed succesfully`);
        });
      }

      return res.json({ success: true, message: "Post created", post });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }
}

const posts = new Post();

export default posts;
