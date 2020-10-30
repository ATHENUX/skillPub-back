import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import api from "routes/api";

export default class config {
  private app: Application;

  constructor(private port: number) {
    this.app = express();
    this.settings();
    this.middlewares();
  }

  private settings() {
    this.app.set("port", process.env.PORT || this.port);
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(morgan("combined"));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    api(this.app);

    this.app.use(require("connect-history-api-fallback")());
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  public run() {
    this.app.listen(this.app.get("port"), () => {
      console.log("SERVER ON PORT ", this.app.get("port"));
    });
  }
}
