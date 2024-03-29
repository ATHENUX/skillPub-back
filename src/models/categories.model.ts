import { Schema, model } from "mongoose";

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Categories = model("categories", categoriesSchema);

export default Categories;
