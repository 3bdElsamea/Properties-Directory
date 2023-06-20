import express from 'express';

import {
  getAllCategories,
  getCategoryById,
} from '../../controllers/dashboard/categoryController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';

const router = express.Router();

router.route('/').get(getAllCategories);

router.route('/:id').all(idParmaMiddleware).get(getCategoryById);

export default router;
