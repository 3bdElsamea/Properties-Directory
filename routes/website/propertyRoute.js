import express from 'express';
import {
  getLastFiveProperties,
  getAllActiveProperties,
  getPropertyById,
} from '../../controllers/website/propertyController.js';

const router = express.Router();

router.get('/', getAllActiveProperties);
router.get('/last-five-properties', getLastFiveProperties);
router.get('/:id', getPropertyById);
export default router;
