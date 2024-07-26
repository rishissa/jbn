import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

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
    unique: true,
  },
  whatsapp_number: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
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
  chapter: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
  },
  member_category: {
    type: Schema.Types.ObjectId,
    ref: "Member_category",
  },
});

memberSchema.plugin(uniqueValidator);
const Member = mongoose.model("Member", memberSchema);

export default Member;
