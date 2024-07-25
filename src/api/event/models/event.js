import mongoose, { Schema } from "mongoose";
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  banner_url: {
    type: String,
  },
  date: {
    type: Date,
  },
  venue: {
    type: String,
  },
  description: {
    type: String,
  },
  host_zones: {
    type: String,
  },
  host_project_name: {
    type: String,
  },
  associate_zones: {
    type: String,
  },
  associate_project_name: {
    type: String,
  },
  chapter: { type: Schema.Types.ObjectId, ref: "Chapter" },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
