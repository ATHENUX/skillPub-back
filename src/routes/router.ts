import { Application } from "express";
import users from "./api/users.api";

const routerDefaul: string = "/api";

export default function router(app: Application) {
  app.use(routerDefaul, users);
}
