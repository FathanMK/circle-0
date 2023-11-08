import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CD_NAME,
  api_key: process.env.CD_API_KEY,
  api_secret: process.env.CD_SECRET,
});

export default cloudinary;
