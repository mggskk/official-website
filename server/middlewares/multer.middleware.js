import path from 'path';
import multer from 'multer';
import { allowedProfileImgExt } from '../constants.js';

const upload = multer({
  dest: 'tmp/',
  storage: multer.diskStorage({
    destination: 'tmp/',
    filename: (_, file, done) => {
      done(null, file.originalname);
    },
  }),
  fileFilter: (req, file, done) => {
    let ext = path.extname(file.originalname);
    if (!allowedProfileImgExt.includes(ext)) {
      done(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }
    done(null, true);
  },
});

export default upload;
