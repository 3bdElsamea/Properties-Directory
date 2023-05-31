import express from 'express';

import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  inactiveCategory,
} from '../../controllers/dashboard/categoryController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import { validationCreateCategory, validationUpdateCategory } from '../../validation/validateCategory.js';

const router = express.Router();

router.route('/').get(getAllCategories).post(createCategory);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getCategoryById)
  .post(validationCreateCategory, createCategory)
  .patch(validationUpdateCategory, updateCategory)

router.route('/:id/toggle-active').all(idParmaMiddleware).patch(inactiveCategory);

export default router;
