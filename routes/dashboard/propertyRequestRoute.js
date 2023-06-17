import express from 'express';
import {
  deletePropertyRequest,
  getAllPropertyRequests,
  updatePropertyRequest,
} from '../../controllers/dashboard/propertyRequestController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import { validationUpdatePropertyRequest } from '../../validation/validatePropertyRequest.js';

const router = express.Router();

router
  .route('/:id')
  .all(idParmaMiddleware)
  .patch(validationUpdatePropertyRequest, updatePropertyRequest)
  .delete(deletePropertyRequest);

router.route('/').get(getAllPropertyRequests);

export default router;
