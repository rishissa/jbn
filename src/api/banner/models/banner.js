import mongoose from "mongoose";
const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  desktop_image_url: {
    type: String,
  },
  mobile_image_url: {
    type: String,
  },
  call_to_action_url: {
    type: String,
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
