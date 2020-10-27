import { Schema, model } from "mongoose";

const stateValues = ["received", "delivered", "viewed"];

const roomsSchema = new Schema({
  message: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      message: {
        type: String,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      state: {
        type: String,
        enum: { values: stateValues },
      },
    },
  ],
});

const Rooms = model("rooms", roomsSchema);

export default Rooms;
