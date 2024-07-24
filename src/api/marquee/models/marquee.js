import mongoose from "mongoose";
const marqueeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image_url: {
    type: String,
  },
  active: {
    type: Boolean,
  },
});

const Marquee = mongoose.model("Marquee", marqueeSchema);

export default Marquee;
