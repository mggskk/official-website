import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { availableGender, availableUserRoles } from '../constants.js';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'email is required'],
      unique: [true, 'email already registered'],
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      select: false,
      required: true,
    },

    gender: {
      type: String,
      enum: availableGender,
      required: true,
    },

    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },

    role: {
      type: String,
      trim: true,
      enum: availableUserRoles,
      default: 'USER',
      required: true,
    },

    subject: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
    },

    forgotPasswordToken: {
      type: String,
    },

    forgotPasswordExpiry: {
      type: Date,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = {
  generateAccessToken: function () {
    return jwt.sign(
      {
        _id: this._id,
        username: this.username,
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
      },
    );
  },
  generateRefreshToken: function () {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
      },
    );
  },
  generateTemporaryToken: function () {
    const unHashedToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(unHashedToken)
      .digest('hex');
    const tokenExpiry = Date.now() + 15 * 60 * 1000;
    return { unHashedToken, hashedToken, tokenExpiry };
  },
  isPasswordCorrect: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
};

export const User = mongoose.model('user', userSchema);
