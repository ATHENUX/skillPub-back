import config from "server/config";

if (process.env.NODE_ENV !== "production") require("dotenv").config();

import "database/mongodb";

function main() {
  const app = new config(4000);
  app.run();
}

main();
