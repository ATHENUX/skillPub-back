import { Request, Response } from "express";
import { validationResult } from "express-validator";
import cloudinary from "config/cloudinary.config";
import Posts from "models/posts.model";
import path from "path";
import { removeFiles } from "helpers/assistant.helpers";

class Post {
  public async addPost(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.json({ success: false, errors: errors.array() });

      let uploadedResponses: any = [];
      let imagePaths: any = [];

      if (req.files.length > 0) {
        imagePaths = (<any>req).files.map((file: any) => file.path);

        let fileToLarge: Boolean = false;

        for (const file of (<any>req).files) {
          if (file.size > 1000000) {
            fileToLarge = true;
            break;
          }
        }

        if (fileToLarge) {
          removeFiles(imagePaths);
          return res.json({ success: false, message: "File too large" });
        }

        let isValid = true;

        for (const file of (<any>req).files) {
          let ext: any = path.extname(file.originalname);
          if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".gif") {
            isValid = false;
            break;
          }
        }

        if (!isValid) {
          removeFiles(imagePaths);
          return res.json({
            succes: false,
            message: "There's a file which extension is not valid",
          });
        }

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
      }

      const { bodyContent } = req.body;

      let newPost: any;

      if (uploadedResponses.length > 0) {
        newPost = new Posts({
          bodyContent,
          thumbnailsList: uploadedResponses,
        });
      } else {
        newPost = newPost({
          bodyContent,
        });
      }

      const post: any = await newPost.save();
      removeFiles(imagePaths);

      return res.json({ success: true, message: "Post created", post });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }
}

const posts = new Post();

export default posts;
