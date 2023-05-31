import express from 'express';
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
} from '../../controllers/dashboard/propertyController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import { uploadImage} from '../../utils/uploadImage.js';
import { validatePropertyCreate, validatePropertyUpdate } from '../../validation/validateProperty.js';

const router = express.Router();

router
  .route('/')
  .get(getAllProperties)
  .post(uploadImage.single('image'), validatePropertyCreate, createProperty);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getPropertyById)
  .patch(uploadImage.single('image'), validatePropertyUpdate, updateProperty);

export default router;
