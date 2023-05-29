import express from 'express';

import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  inactiveCategory,
} from '../../controllers/dashboard/categoryController.js';

const router = express.Router();

router.route('/').get(getAllCategories).post(createCategory);

router
  .route('/:id')
  .get(getCategoryById)
  .put(updateCategory)
  .patch(inactiveCategory);

export default router;
