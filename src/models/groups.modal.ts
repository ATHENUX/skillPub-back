import { Schema, model } from "mongoose";

const privacyLevelValues = ["public", "private"];

const groupsSchema = new Schema({
  privacyLevel: {
    type: String,
    enum: { values: privacyLevelValues },
  },
  description: {
    type: String,
    maxlength: [60, "too big a description"],
  },
  avatar: {
    type: String,
  },
  banner: {
    type: String,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  postsList: [
    {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
});

const Groups = model("groups", groupsSchema);

export default Groups;
