import mongoose from "mongoose";
const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: string,
  },
  image_url: {
    type: string,
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
