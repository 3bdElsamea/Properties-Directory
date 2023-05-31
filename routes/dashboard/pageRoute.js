import express from 'express';

import {
  getAllPages,
  createPage,
  updatePage,
  deletePage,
} from '../../controllers/dashboard/pageController.js';

import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';

const router = express.Router();

router.route('/').get(getAllPages).post(createPage);

router.route('/:id').all(idParmaMiddleware).put(updatePage).delete(deletePage);

export default router;
