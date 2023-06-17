import express from 'express';
import {
  createPropertyRequest,
  getAllPropertyRequests,
} from '../../controllers/website/requestController.js';

const router = express.Router();

router.route('/').get(getAllPropertyRequests);
router.route('/:id').post(createPropertyRequest);

export default router;
