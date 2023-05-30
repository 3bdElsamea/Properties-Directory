import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from './../config/s3.js';
import path from 'path';
import { config } from 'dotenv';
import AppError from './appError.js';

config();

const storage = multerS3({
  s3,
  bucket: process.env.S3_BUCKET,
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  cacheControl: 'max-age=31536000',
  key: function (req, file, cb) {
    const fileName = `RealEstate/${Date.now()}_${Math.round(
      Math.random() * 1e9,
    )}`;
    cb(null, `${fileName}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new AppError('Invalid file type, only JPEG, PNG and JPG are allowed', 403));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024*1024*2 },
  fileFilter,
});

export default upload;
