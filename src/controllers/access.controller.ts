import { Request, Response } from "express";

class Access {
  public login(req: Request, res: Response):Response {
    return res.json("hola desde el back");
  }
}

const access = new Access();

export default access