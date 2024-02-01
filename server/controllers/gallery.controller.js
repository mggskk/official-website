import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import { Gallery } from '../models/gallery.model.js';
import { env } from '../constants.js';

const cloudinaryUploader = async (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.v2.uploader.upload(file, {
        folder: 'mggs-gallery',
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteFromCloudinary = async (public_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.v2.uploader.destroy(public_id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const uploadPhoto = async (req, res) => {
  try {
    if (req.files) {
      try {
        const files = req.files;
        const docs = [];
        for (const file of files) {
          const result = await cloudinaryUploader(file.path);
          docs.push({
            ...req.body,
            img_link: {
              secure_url: result.secure_url,
              public_id: result.public_id,
            },
            uploaded_by: {
              user_id: req.user._id,
              user_email: req.user.email,
            },
          });
        }
        const gallery = Gallery.create(docs);
        if (!gallery) {
          return res
            .status(500)
            .json({ success: false, msg: 'Could not upload photoes' });
        }

        for (const file of files) {
          await fs.rm(`tmp/${file.filename}`);
        }

        return res
          .status(201)
          .json({ success: true, msg: 'Images uploaded successfully' });
      } catch (error) {
        console.log(error.message);
        return res
          .status(500)
          .json({ success: false, msg: 'File not uploaded. Try again' });
      }
    }

    return res
      .status(400)
      .json({ success: false, msg: 'Did not get the image. Try again.' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const fetchGallery = async (req, res) => {
  try {
    const { page } = req.query || 1;
    const limit = env.PER_PAGE_IMAGE_LIMIT;
    const skip = (+page - 1) * +limit;
    const totalImgs = await Gallery.countDocuments();
    const gallery = await Gallery.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    if (!gallery) {
      return res
        .status(404)
        .json({ success: true, msg: 'Could not find images' });
    }
    return res.status(200).json({
      success: true,
      msg: 'Images fetched successfully',
      gallery,
      page,
      totalImgs,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { imgId } = req.params;
    const { img_public_id } = req.body;
    if (!(imgId || img_public_id)) {
      return res
        .status(400)
        .json({ success: false, msg: 'Image Id is required' });
    }

    const deletedImg = await deleteFromCloudinary(img_public_id);
    if (!deletedImg) {
      return res.status(500).json({
        success: false,
        msg: 'Some error occured while deleting the image',
      });
    }

    await Gallery.findByIdAndDelete(imgId).then(() =>
      res
        .status(200)
        .json({ success: true, msg: 'Image deleted successfully', imgId }),
    );
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: 'Something went wrong' });
  }
};
