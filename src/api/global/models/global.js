import mongoose from "mongoose";
const globalSchema = new mongoose.Schema({
  brand_name: {
    type: String,
  },
  brand_logo_url: {
    type: String,
  },
  address: {
    type: String,
  },
  twitter_handle: {
    type: String,
  },
  facebook_handle: {
    type: String,
  },
  instagram_handle: {
    type: String,
  },
  linkedin_handle: {
    type: String,
  },
  tagline: {
    type: String,
  },
  phone: {
    type: String,
  },
  brand_website_url: {
    type: String,
  },
});

const Global = mongoose.model("Global", globalSchema);

export default Global;
