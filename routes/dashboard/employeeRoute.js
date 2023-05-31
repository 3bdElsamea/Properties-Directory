import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../../controllers/dashboard/employeeController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import {
  validationEmployeeCreate, validationEmployeeUpdate,
} from '../../validation/validateEmployee.js';
import { uploadImage } from '../../utils/uploadImage.js';

const router = express.Router();

router
  .route('/')
  .get(getAllEmployees)
  .post(uploadImage.single('image'), validationEmployeeCreate, createEmployee);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getEmployeeById)
  .patch(uploadImage.single('image'), validationEmployeeUpdate, updateEmployee)
  .delete(deleteEmployee);

export default router;
