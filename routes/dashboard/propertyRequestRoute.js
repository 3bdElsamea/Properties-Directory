import express from 'express';
import {
  deletePropertyRequest,
  getAllPropertyRequests,
  updatePropertyRequest,
} from '../../controllers/dashboard/propertyRequestController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import { validationUpdatePropertyRequest } from '../../validation/validatePropertyRequest.js';

const router = express.Router();

router.route('/').get(getAllPropertyRequests);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .patch(validationUpdatePropertyRequest, updatePropertyRequest)
  .delete(deletePropertyRequest);

export default router;
