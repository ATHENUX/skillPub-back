import { Schema, model } from "mongoose";

const aptitudesSchema = new Schema({
  idCategorie: {
    type: Schema.Types.ObjectId,
    ref: "categories",
  },
  name: {
    type: String,
    required: true,
  },
});

const Aptitudes = model("aptitudes", aptitudesSchema);

export default Aptitudes;
