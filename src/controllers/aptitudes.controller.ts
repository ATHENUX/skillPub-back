import { Request, Response } from "express";
import Aptitudes from "models/aptitudes.model";

class Aptitude {
  public async getAptitudes(req: Request, res: Response): Promise<Response> {
    const { idCategorie } = req.body;
    try {
      const aptitudes = await Aptitudes.find({ idCategorie });
      return res.json({ success: true, aptitudes });
    } catch (error) {
      return res.json({ success: false, error });
    }
  }
}

const aptitudes = new Aptitude();

export default aptitudes;
