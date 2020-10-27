import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const isLogged = async (req: Request, res: Response, next: NextFunction) => {
  const auth: any = req.headers["auth"];

  if (!auth) {
    return res.status(403).json({ message: "user is not login", success: false });
  }

  jwt.verify(auth, process.env.TOKENJWT!, function (err: JsonWebTokenError | NotBeforeError | TokenExpiredError | null, user: object | undefined): void {
    if (err) {
      res.status(403).json({ message: "user is not login", success: false, err });
    } else {
      req.token = user;
      next();
    }
  });
};

export { isLogged };
