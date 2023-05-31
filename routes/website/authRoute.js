import express from 'express';
import {
  login,
  register,
  myProfile,
  forgetPassword,
  resetPassword,
  updateProfile,
  deleteProfile
} from '../../controllers/website/authController.js';

import {
  customerLogin,
  customerRegister,
  customerForgetPassword,
  customerResetPassword,
  customerUpdateProfile,
} from '../../validation/validateAuthCustomer.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

import { uploadImage } from '../../utils/uploadImage.js';

const router = express.Router();

router.post('/login', customerLogin, login);
router.post('/register', customerRegister, register);
router.post('/forget-password', customerForgetPassword, forgetPassword);
router.post('/reset-password', customerResetPassword, resetPassword);

router
  .route('/me')
  .all(authMiddleware)
  .get(myProfile)
  .patch(uploadImage.single('image'), customerUpdateProfile, updateProfile)
  .delete(deleteProfile);

export default router;
