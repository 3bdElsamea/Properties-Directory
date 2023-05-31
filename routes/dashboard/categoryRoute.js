import express from 'express';

import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  inactiveCategory,
} from '../../controllers/dashboard/categoryController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';

const router = express.Router();

router.route('/').get(getAllCategories).post(createCategory);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getCategoryById)
  .put(updateCategory);
router.route('/:id/active').all(idParmaMiddleware).patch(inactiveCategory);

export default router;
