import { Request, Response } from "express";

class User {
  public login(req: Request, res: Response):Response {
    return res.json("hola desde el back");
  }
}

const user = new User();

export default user