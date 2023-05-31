import express from 'express';
import {
  login,
  myProfile,
  forgetPassword,
  resetPassword,
  updateProfile,
} from '../../controllers/dashboard/authController.js';

import {
  employeeLogin,
  employeeForgetPassword,
  employeeResetPassword,
  employeeUpdateProfile,
} from '../../validation/validateAuthEmployee.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

import { upload } from '../../utils/uploadImage.js';

const router = express.Router();

router.post('/login', employeeLogin, login);
router.post('/forget-password', employeeForgetPassword, forgetPassword);
router.post('/reset-password', employeeResetPassword, resetPassword);

router
  .route('/me')
  .all(authMiddleware)
  .get(myProfile)
  .post(upload.single('image'), employeeUpdateProfile, updateProfile);

export default router;
