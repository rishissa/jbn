import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";

export const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error.message);
  }
};
