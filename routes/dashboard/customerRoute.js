import express from 'express';
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../../controllers/dashboard/customerController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import upload from '../../utils/uploadImage.js';
import validateCustomer from '../../validation/validateCustomer.js';

const router = express.Router();

router
  .route('/')
  .get(getAllCustomers)
  // .post(validateCustomer, createCustomer);
  .post(upload.single('image'), createCustomer);
router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getCustomerById)
  .patch(updateCustomer)
  .delete(deleteCustomer);

export default router;
