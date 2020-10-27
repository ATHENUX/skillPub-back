import { Schema, model } from "mongoose";

const calendarsSchema = new Schema({
  date: {
    type: Date,
  },
  idAgenda: {
    type: Schema.Types.ObjectId,
    ref: "agendas",
  },
});

const Calendars = model("calendars", calendarsSchema);

export default Calendars;
