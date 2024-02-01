import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: String,
    img_link: {
      secure_url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    uploaded_by: {
      user_id: {
        type: String,
        required: true,
      },
      user_email: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Gallery = mongoose.model('gallery', gallerySchema);
