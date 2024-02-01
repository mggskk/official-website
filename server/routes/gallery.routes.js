import express from 'express';
import { verifyJWT, verifyPermission } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';
import {
  deleteImage,
  fetchGallery,
  uploadPhoto,
} from '../controllers/gallery.controller.js';
import { userRolesEnum } from '../constants.js';
const router = express.Router();

router
  .route('/upload-photo')
  .post(
    verifyJWT,
    verifyPermission([userRolesEnum.ADMIN, userRolesEnum.STAFF]),
    upload.array('img', 10),
    uploadPhoto,
  );

router.route('/images').get(fetchGallery);

router.route('/delete-image/:imgId').delete(deleteImage);

export default router;
