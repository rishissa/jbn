import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    username: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    country_code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);

export default User;
