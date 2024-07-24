import mongoose from "mongoose";
const gallerySchema = new mongoose.Schema({
  tag: {
    type: String,
  },
  image_url: {
    type: String,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
