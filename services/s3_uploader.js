import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
// const Transform = require('stream').Transform;
import { config } from "dotenv";
import {
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  S3_BUCKET,
  S3_REGION,
} from "../config/env.js";
config();
const accessKeyId = AWS_ACCESS_KEY;
const secretAccessKey = AWS_SECRET_KEY;
const region = S3_REGION;
const Bucket = S3_BUCKET;
const aws_s3_uploader = async (file) => {
  const filesToUpload = await new Upload({
    client: new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    }),
    params: {
      ACL: "public-read",
      Bucket,
      Key: file.originalname,
      Body: file.buffer,
    },
    tags: [],
    queueSize: 4,
    partSize: 1024 * 1024 * 5,
    leavePartsOnError: false,
  }).done();
  return filesToUpload.Location;
};

export default aws_s3_uploader;
