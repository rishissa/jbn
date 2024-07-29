import mongoose from "mongoose";
const calendarSchema = new mongoose.Schema({
  event_name: {
    type: String,
  },
  date: {
    type: Date,
  },
  tag: {
    type: String,
    enum: ["birthday", "anniversary", "upcoming_activities"],
  },
});

const Calendar = mongoose.model("Calendar", calendarSchema);

export default Calendar;
