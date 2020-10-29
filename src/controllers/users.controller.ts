import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createToken } from "helpers/assistant";
import Users from "models/users.model";

class User {
  public async signIn(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json({ success: false, errors: errors.array() });

    const { email, password } = req.body;
    const user: any = await Users.findOne({ email: email });
    const verifyPassword = await user.matchPassword(password);
    if (!verifyPassword) return res.json({ success: false, message: "Incorrect password" });

    const token = createToken(user._id);

    return res.json({ success: true, message: "successfully", token });
  }

  public async signUp(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json({ success: false, errors: errors.array() });

    const { email, password, firstName, lastName } = req.body;
    const findEmail = await Users.findOne({ email });
    if (findEmail !== null) return res.json({ success: false, message: "Email is already registered" });

    const newUser: any = new Users({
      email,
      password,
      firstName,
      lastName,
    });

    newUser.password = await newUser.encryptPassword(newUser.password);
    const user = await newUser.save();
    
    const token = createToken(user._id);

    return res.json({ success: true, message: "Registered user", token });
  }
}

const user = new User();

export default user;
