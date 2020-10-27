import { Schema, model } from "mongoose";

const postsSchema = new Schema(
  {
    bodyContent: {
      type: String,
      maxlength: [60, "content body max"],
    },
    thumbnailsList: [
      {
        type: String,
      },
    ],
    likesList: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
    // -------  Republished --------
    RepublishedValidation: {
      type: Boolean,
      default: false,
    },
    RepublishedBodyContent: {
      type: String,
      maxlength: [60, "content body max"],
    },
    republishedUsersId: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    originPostId: {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
  },
  {
    timestamps: true,
  }
);

const Posts = model("posts", postsSchema);

export default Posts;
