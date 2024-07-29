import mongoose from "mongoose";
const public_dataSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: Object,
  },
  thumbnail: { type: String },
});

const Public_data = mongoose.model("Public_data", public_dataSchema);

export default Public_data;
