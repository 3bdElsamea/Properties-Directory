import express from 'express';
import {
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from '../../controllers/dashboard/customerController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import {
  validateCustomerUpdate,
} from '../../validation/validateCustomer.js';
import { uploadImage} from '../../utils/uploadImage.js';

const router = express.Router();

router
  .route('/')
  .get(getAllCustomers)

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getCustomerById)
  .patch(uploadImage.single('image'), validateCustomerUpdate, updateCustomer)
  .delete(deleteCustomer);

export default router;
