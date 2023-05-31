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
  employeeCreate,
  employeeUpdate,
} from '../../validation/validateEmployee.js';
import upload from '../../utils/uploadImage.js';

const router = express.Router();

router
  .route('/')
  .get(getAllEmployees)
  .post(upload.single('image'), employeeCreate, createEmployee);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getEmployeeById)
  .patch(upload.single('image'), employeeUpdate, updateEmployee)
  .delete(deleteEmployee);

export default router;
