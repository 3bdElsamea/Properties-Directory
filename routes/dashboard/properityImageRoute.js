import express from 'express';
import {
  createPropertyImage,
  deletePropertyImage,
} from '../../controllers/dashboard/propertyImagesController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import upload from '../../utils/uploadImage.js';

const router = express.Router();

router
  .route('/:id')
  .all(idParmaMiddleware)
  .post(upload.single('image'), createPropertyImage)
  .delete(deletePropertyImage);

export default router;
