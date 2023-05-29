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
  customerCreate,
  customerUpdate,
} from '../../validation/validateCustomer.js';

const router = express.Router();

router.route('/').get(getAllCustomers).post(customerCreate, createCustomer);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getCustomerById)
  .patch(customerUpdate, updateCustomer)
  .delete(deleteCustomer);

export default router;
