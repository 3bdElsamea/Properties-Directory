import express from 'express';

import {
  getAllGeneralRequests,
  getGeneralRequest,
} from '../../controllers/dashboard/propertiesMatchingController.js';

import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';

const router = express.Router();

router.route('/').get(getAllGeneralRequests);

router.route('/:id').all(idParmaMiddleware).get(getGeneralRequest);

export default router;
