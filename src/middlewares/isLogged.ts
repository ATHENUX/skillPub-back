import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import Users from "models/users.model";
import {constants} from "helpers/constants"

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const isLogged = async (req: Request, res: Response, next: NextFunction) => {
  const auth: any = req.headers["auth"];

  if (!auth) {
    return res.status(constants.httpCodes.forbidden).json({ message: "User is not login", success: false });
  }

  jwt.verify(auth, process.env.TOKENJWT!, async function (err: JsonWebTokenError | NotBeforeError | TokenExpiredError | null, userId: object | undefined): Promise<void> {
    if (err) {
      res.status(constants.httpCodes.forbidden).json({ message: "Error verifying token", success: false, err });
    } else {
      const user = await Users.findById((<any>userId)?.id);
      (<any>req)["decoded"] = user;
      next();
    }
  });
};

export { isLogged };
