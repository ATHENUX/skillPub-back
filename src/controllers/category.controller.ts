import { Request, Response } from "express";
import Categories from "models/categories.model";

class Categorie {
  public async getCategories(req: Request, res: Response): Promise<Response> {
    try {
      const categories = await Categories.find();
      return res.json({ success: true, categories });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }
}

const categories = new Categorie();

export default categories;
