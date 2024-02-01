import express from 'express';
import {
  changeCurrentPassword,
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
  updateUserAvatar,
  updateUserByAdmin,
  verifyEmail,
} from '../controllers/auth.controller.js';
import { verifyJWT, verifyPermission } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';
import { userRolesEnum } from '../constants.js';

const router = express.Router();

router.route('/register').post(upload.single('avatar'), registerUser);
router.route('/verify-email/:verificationToken').get(verifyEmail);

router.route('/login').post(loginUser);

router.route('/fetch-user').get(verifyJWT, fetchUser);

router.route('/log-out').post(verifyJWT, logoutUser);

router
  .route('/update-user/:userId')
  .patch(verifyJWT, verifyPermission(userRolesEnum.ADMIN), updateUserByAdmin);

router.route('/update-profile/:userId').patch(verifyJWT, updateProfile);

router
  .route('/update-avatar/:userId')
  .patch(verifyJWT, upload.single('avatar'), updateUserAvatar);

router.route('/change-password').patch(verifyJWT, changeCurrentPassword);
export default router;
