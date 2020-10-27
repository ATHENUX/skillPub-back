import { Schema, model } from "mongoose";

const typeValues = ["group", "directMessages"];
const statevalues = ["hidden", "Remove", "view", "archived"];

const chatsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  contacts: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      roomId: {
        type: Schema.Types.ObjectId,
        ref: "rooms",
      },
      type: {
        type: String,
        enum: { values: typeValues },
      },
      state: {
        type: String,
        enum: { values: statevalues },
        default: "view",
      },
    },
  ],
});

const Chats = model("chats", chatsSchema);

export default Chats;
