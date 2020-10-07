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
    console.error("MONGODB ERROR:", err);
  });

mongoose.set("useCreateIndex", true);
