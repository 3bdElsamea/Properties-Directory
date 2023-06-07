import express from 'express';
import {
  getAllPages,
  createPage,
  updatePage,
  deletePage,
} from '../../controllers/dashboard/pageController.js';

import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import { validatePageCreate, validatePageUpdate } from '../../validation/validatePage.js';

const router = express.Router();
router.route('/').get(getAllPages).post(validatePageCreate, createPage);
router.route('/:id').all(idParmaMiddleware).patch(validatePageUpdate, updatePage).delete(deletePage);

export default router;
