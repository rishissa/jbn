import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";
import { initializeSuperadmin } from "../services/initialize_superadmin.js";

export const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await initializeSuperadmin();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error.message);
  }
};
