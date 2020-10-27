import { Schema, model } from "mongoose";
const statevalues = ["hidden", "Remove", "view"];

const commentsSchema = new Schema({
  enableComments: {
    type: Boolean,
    default: true,
  },
  body: [
    {
      userid: Schema.Types.ObjectId,
      ref: "users",
      comment: {
        type: String,
        maxlength: [60, "comment exceeds maximum characters"],
      },
      state: {
        type: String,
        enum: { values: statevalues, massage: "option is not valid" },
        default: "view",
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      replies:{
        type:Schema.Types.ObjectId,
        ref:"replies"
      },
    },
  ],
});

const Comments = model("comments", commentsSchema);

export default Comments;
