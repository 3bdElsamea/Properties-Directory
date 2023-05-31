import express from 'express';
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
} from '../../controllers/dashboard/propertyController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import { upload } from '../../utils/uploadImage.js';

const router = express.Router();

router
  .route('/')
  .get(getAllProperties)
  .post(upload.single('image'), createProperty);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getPropertyById)
  .patch(upload.single('image'), updateProperty);

export default router;
