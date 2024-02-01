import fs from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '../constants.js';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_secret: env.CLOUDINARY_API_SECRET,
  api_key: env.CLOUDINARY_API_KEY,
});

export const uploadOnCloudinary = async (localFilePath, uploadOptions) => {
  try {
    if (!localFilePath) {
      console.log('Local file path is missing');
      return null;
    }

    const res = await cloudinary.uploader.upload(localFilePath, uploadOptions);

    fs.rm(localFilePath);
    return res;
  } catch (error) {
    fs.rm(localFilePath);
    return null;
  }
};

export const deleteFromCloudinary = async (public_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.uploader.destroy(public_id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
