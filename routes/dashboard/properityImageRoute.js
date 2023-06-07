import express from 'express';
import {
  createPropertyImage,
  deletePropertyImage,
} from '../../controllers/dashboard/propertyImagesController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import { uploadImage} from '../../utils/uploadImage.js';

const router = express.Router();

router
  .route('/:id')
  .all(idParmaMiddleware)
  .post(uploadImage.single('image'), createPropertyImage)
  .delete(deletePropertyImage);

export default router;
