import mongoose from "mongoose";
const memberSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  designation: {
    type: String,
  },
  address: {
    type: String,
  },
  organization: {
    type: String,
  },
  profile_pic_url: {
    type: String,
  },
  cover_image_url: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  whatsapp_number: {
    type: String,
  },
  email: {
    type: String,
  },
  instagram_handle: {
    type: String,
  },
  website_url: {
    type: String,
  },
  about: {
    type: String,
  },
});

const Member = mongoose.model("Member", memberSchema);

export default Member;
