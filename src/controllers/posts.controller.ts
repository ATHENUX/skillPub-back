import { Request, Response } from "express";
import { validationResult } from "express-validator";
import cloudinary from "config/cloudinary.config";
import Posts from "models/posts.model";
import Users from "models/users.model";
import path from "path";
import { removeFiles } from "helpers/assistant.helpers";
class Post {
  public async addPost(req: Request, res: Response): Promise<Response> {
    const decoded = (<any>req)["decoded"]._id;
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
              let publicId: any = result.public_id;
              uploadedResponses.push(publicId);
            }
          );
        }
      }

      const { bodyContent } = req.body;

      let newPost: any;

      if (uploadedResponses.length > 0) {
        newPost = new Posts({
          bodyContent,
          userId: decoded,
          thumbnailsList: uploadedResponses,
        });
      } else {
        newPost = new Posts({
          bodyContent,
          userId: decoded,
        });
      }

      const post: any = await newPost.save();
      if (imagePaths.length > 0) {
        removeFiles(imagePaths);
      }

      return res.json({ success: true, message: "Post created", post });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public async countPosts(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    try {
      const count = await Posts.find({ userId: id }).count();
      return res.json({ success: true, count });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public async getPostsProfile(req: Request, res: Response): Promise<Response> {
    const { id, limit } = req.body;
    try {
      const posts = await Posts.find({ userId: id })
        .populate("userId", "avatar firstName lastName")
        .populate("republishedUserId", "avatar firstName lastName")
        .sort({ createdAt: -1 })
        .limit(limit);

      let hasMore: Boolean = true;

      if (posts.length < limit) {
        hasMore = false;
      }

      return res.json({ success: true, posts, hasMore });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public async republishPost(req: Request, res: Response): Promise<Response> {
    const { share, republishedIds } = req.body;

    try {
      const findUserInPost: any = await Posts.findOne({ _id: republishedIds.postId });

      const findUser = findUserInPost.republishedUsersId.find((id: String) => {
        return id == republishedIds.userId;
      });

      if (findUser === undefined) {
        const post = new Posts({
          ...share,
        });

        await post.save();

        await Posts.updateOne(
          { _id: republishedIds.postId },
          { $push: { republishedUsersId: republishedIds.userId } }
        );

        return res.json({ success: true, message: "Republished post" });
      } else {
        return res.json({ success: false, message: "Already published" });
      }
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public async getPostsHome(req: Request, res: Response): Promise<Response> {
    const { id, limit } = req.body;
    try {
      const followedUsers: any = await Users.findById(id, "following");

      const posts: any = await Posts.find({ userId: { $in: followedUsers.following } })
        .populate("userId", "avatar firstName lastName")
        .populate("republishedUserId", "avatar firstName lastName")
        .sort({
          createdAt: -1,
        })
        .limit(parseInt(limit));

      let hasMore: Boolean = true;

      if (posts.length < limit) {
        hasMore = false;
      }

      return res.json({ success: true, posts, hasMore });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public async likePost(req: Request, res: Response): Promise<Response> {
    const { postId, userId } = req.body;
    try {
      const post = await Posts.findOneAndUpdate({ _id: postId }, { $push: { likesList: userId } });
      return res.json({ success: true, post });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }

  public async dislikePost(req: Request, res: Response): Promise<Response> {
    const { postId, userId } = req.body;
    try {
      const post = await Posts.findOneAndUpdate({ _id: postId }, { $pull: { likesList: userId } });
      return res.json({ success: true, post });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }
}

const posts = new Post();

export default posts;
