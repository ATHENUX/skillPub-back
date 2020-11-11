import { Schema, model } from "mongoose";

const agendasSchema = new Schema({
  todos: [
    {
      time: {
        type: Date,
      },
      title: {
        type: String,
        maxlength: [40, "too big a title"],
      },
      description: {
        type: String,
        maxlength: [60, "too big a description"],
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Agendas = model("agendas", agendasSchema);

export default Agendas;
