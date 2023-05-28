import express from 'express';
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../../controllers/dashboard/customerController.js';

const router = express.Router();

router.route('/').get(getAllCustomers).post(createCustomer);
router
  .route('/:id')
  .get(getCustomerById)
  .patch(updateCustomer)
  .delete(deleteCustomer);

export default router;
