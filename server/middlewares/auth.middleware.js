import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const verifyJWT = async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: 'Unauthorized request' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      '-refreshToken -emailVerificationToken -emailVerificationExpiry',
    );

    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: 'Invalid access Token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const verifyPermission =
  (roles = []) =>
  async (req, res, next) => {
    if (!req.user?._id) {
      return res
        .status(401)
        .json({ success: false, msg: 'Unauthorized request' });
    }

    if (roles.includes(req.user?.role)) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        msg: "You're not allowed to perform this task",
      });
    }
  };
