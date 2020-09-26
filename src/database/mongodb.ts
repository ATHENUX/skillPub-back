import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Mongo is connected ");
  })
  .catch((err) => {
    console.error("error en la coneccion de mongodb ", err);
  });

mongoose.set("useCreateIndex", true);
