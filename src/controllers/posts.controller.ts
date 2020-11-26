import { Request, Response } from "express";
import Posts from "models/posts.model";

class Post {
  public async addPost(req: Request, res: Response): Promise<Response> {
    try {
      return res.json({ success: true });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }
}

const posts = new Post();

export default posts;
