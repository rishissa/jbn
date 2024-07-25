import mongoose from "mongoose";
const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  banner_url: {
    type: String,
  },
});

const Chapter = mongoose.model("Chapter", chapterSchema);

export default Chapter;
