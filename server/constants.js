import { config } from 'dotenv';
config();
// environment vars
export const env = {
  MONGO_URI: process.env.MONGO_URI,
  CLIENT_URI: process.env.CLIENT_URI,
  SENDER_EMAIL: process.env.SENDER_EMAIL,
  SENDER_EMAIL_PASSWORD: process.env.SENDER_EMAIL_PASSWORD,
  PROJECT_TITLE: process.env.PROJECT_TITLE,
  PORT: process.env.PORT || 5000,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  PER_PAGE_IMAGE_LIMIT: process.env.PER_PAGE_IMAGE_LIMIT,
};

// user roles
export const userRolesEnum = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
};

export const availableUserRoles = Object.values(userRolesEnum);

// allowed profile image extensions
export const allowedProfileImgExt = ['.png', '.jpg', '.jpeg'];

// genders for user model
export const genderEnum = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
};

export const availableGender = Object.values(genderEnum);
