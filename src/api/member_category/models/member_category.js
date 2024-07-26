import mongoose from "mongoose";
const member_categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Member_category = mongoose.model(
  "Member_category",
  member_categorySchema
);

export default Member_category;
