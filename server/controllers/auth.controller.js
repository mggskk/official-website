import { env } from '../constants.js';
import { User } from '../models/user.model.js';
import fs from 'fs/promises';
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from '../utils/cloudinary.js';

const cookieOptions = {
  secure: true,
  httpOnly: true,
  sameSite: 'none',
  path: '/',
  maxAge: 864000000,
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error.message);
  }
};

export const registerUser = async (req, res) => {
  const { email } = req.body;

  const userExists = await User.findOne({
    email,
  });

  if (userExists) {
    return res.status(409).json({
      succcess: false,
      msg: 'User already exist with email ',
    });
  }

  const user = await User.create({
    ...req.body,
  });

  if (!user) {
    return res
      .status(500)
      .json({ success: false, msg: 'Could not create user' });
  }

  if (req.file) {
    try {
      const result = await uploadOnCloudinary(req.file.path, {
        folder: 'mggs-user-profiles',
        gravity: 'faces',
        width: 500,
        height: 500,
        crop: 'fill',
      });
      if (result) {
        user.avatar.secure_url = result.secure_url;
        user.avatar.public_id = result.public_id;
        await user.save();
        await fs.rm(`tmp/${req.file.filename}`);
      }
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ success: false, msg: 'File not uploaded. Try again' });
    }
  }

  const accessToken = user.generateAccessToken();

  return res
    .status(201)
    .cookie('accessToken', accessToken, cookieOptions)
    .json({
      success: true,
      msg: 'Account created successfully',
      user,
    });
};

export const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    return res
      .status(400)
      .json({ success: false, msg: 'Email verification token is missing' });
  }

  let hashedToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(489)
      .json({ success: false, msg: 'Token is invalid or expired' });
  }

  user.emailVerificationExpiry = undefined;
  user.emailVerificationToken = undefined;
  user.isEmailVerified = true;
  await user.save();
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );
  return res
    .status(301)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .redirect(`${env.CLIENT_URI}`);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res
      .status(400)
      .json({ succcess: false, msg: 'Proper credentials are required' });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(404).json({
      succcess: false,
      msg: `No user found with the email - '${email}'`,
    });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({ succcess: false, msg: 'Incorrect password' });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    '-refreshToken -emailVerificationToken -emailVerificationExpiry',
  );

  return res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .json({
      success: true,
      msg: 'User logged in successfully',
      user: loggedInUser,
    });
};

export const fetchUser = async (req, res) => {
  return res
    .status(200)
    .json({ success: true, msg: 'User fetched successfully', user: req.user });
};

export const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { refreshToken: undefined },
      },
      { new: true },
    );

    return res
      .clearCookie('accessToken', cookieOptions)
      .status(200)
      .json({ success: true, msg: 'User logged out successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.params.userId) {
      return res
        .status(400)
        .json({ success: false, msg: 'Did not get user id' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        ...req.body,
      },
      { new: true },
    );

    if (!user) {
      return res.status(500).json({
        success: false,
        msg: 'Some error occured while updating profile details',
      });
    }
    return res
      .status(200)
      .json({ success: true, user, msg: 'User updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    if (!req.params.userId) {
      return res
        .status(400)
        .json({ success: false, msg: 'Did not get user id' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        ...req.body,
      },
      { new: true },
    );

    if (!user) {
      return res
        .status(500)
        .json({ success: false, msg: 'Error while updating user' });
    }

    return res
      .status(200)
      .json({ success: true, user, msg: 'User updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const updateUserAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const avatarLocalPath = req?.file?.path;

    console.log(req.body);

    if (!avatarLocalPath) {
      return res.status(400).json({ success: false, msg: 'File is missing' });
    }

    const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath, {
      folder: 'mggs-user-profiles',
      gravity: 'faces',
      width: 500,
      height: 500,
      crop: 'fill',
    });
    if (!uploadedAvatar) {
      return res.status(500).json({
        succcess: false,
        msg: 'Error occured while uploading image to the cloud',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: `No user found with the userid - '${userId}'`,
      });
    }

    await deleteFromCloudinary(user.avatar.public_id);

    user.avatar.secure_url = uploadedAvatar.secure_url;
    user.avatar.public_id = uploadedAvatar.public_id;

    await user.save();

    return res.status(200).json({
      success: true,
      msg: 'Profile picture updated successfully',
      user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const changeCurrentPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, msg: 'Invalid old password' });
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json({ success: true, msg: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
