import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) return null;

    const response = await cloudinary.uploader.upload(localFilepath, {
      resource_type: "auto",
    });

    console.log("file uploaded on cloudinary, file src: " + response.url);
    // after uploading is complete deleet from serevr
    fs.unlinkSync(localFilepath);

    return response;
  } catch (error) {
    console.log("Error on cloudinary", error);
    fs.unlinkSync(localFilepath);
    return null;
  }
};

const deleteOnCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleetd from cloduinary. public id:", publicId);
  } catch (error) {
    console.log("Error deleteing on cloduinary", error);
  }
};

export { uploadOnCloudinary as uploadOnCLoudinary, deleteOnCloudinary };
