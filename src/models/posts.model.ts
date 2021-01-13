import { Schema, model } from "mongoose";

const postsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
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
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    // -------  Republished --------
    republishedValidation: {
      type: Boolean,
      default: false,
    },
    republishedBodyContent: {
      type: String,
      maxlength: [60, "content body max"],
    },
    republishedUserId: {
      type: Schema.Types.ObjectId,
      ref: "users",
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
