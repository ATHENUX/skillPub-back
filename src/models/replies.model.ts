import { Schema, model } from "mongoose";

const statevalues = ["hidden", "Remove", "view"];

const repliesSchema = new Schema({
  replies: [
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
    },
  ],
});

const Replies = model("replies", repliesSchema);

export default Replies;
