import { config } from "dotenv";

config();

export const MONGO_URI = process.env.MONGO_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const S3_REGION = process.env.S3_REGION;
export const S3_BUCKET = process.env.S3_BUCKET;
