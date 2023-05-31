import express from 'express';
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../../controllers/dashboard/customerController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import {
  validateCustomerCreate,
  validateCustomerUpdate,
} from '../../validation/validateCustomer.js';
import { upload } from '../../utils/uploadImage.js';

const router = express.Router();

router
  .route('/')
  .get(getAllCustomers)
  .post(upload.single('image'), validateCustomerUpdate, createCustomer);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getCustomerById)
  .patch(upload.single('image'), validateCustomerUpdate, updateCustomer)
  .delete(deleteCustomer);

export default router;
