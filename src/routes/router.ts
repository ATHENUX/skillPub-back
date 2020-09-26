import { Application } from "express";
import access from "./api/access.api";

const routerDefaul: string = "/api";

export default function router(app: Application) {
  app.use(routerDefaul, access);
}
