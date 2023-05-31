import express from 'express';

import {
  getAllProperties,
  getPropertyById,
  matchingProperty
} from '../../controllers/dashboard/propertiesMatchingController.js';

import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';

const router = express.Router();

router.route('/').get(getAllProperties);
router.route('/matchingProperty').get(matchingProperty);

router.route('/:id').all(idParmaMiddleware).get(getPropertyById);

export default router;
