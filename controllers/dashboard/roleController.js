import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import Employee from '../../models/Employee.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import { sendEmailForgetPasswordEmployee } from '../../utils/emailSender.js';

config();

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const customer = await Employee.findOne({ where: { email: email } });

  if (!customer || !bcrypt.compareSync(password, customer.password)) {
    return next(new AppError('Invalid email or password', 400));
  }

  const token = jwt.sign({ customerId: customer.id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE_IN,
  });

  res.json({ token });
});

export const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const customer = await Employee.findOne({ where: { email } });

  if (!customer) {
    return next(new AppError('No customer found with that email', 404));
  }

  customer.password_token = jwt.sign({ customerId: customer.id }, process.env.TOKEN_SECRET, {
    expiresIn: '15m',
  });

  customer.password_token_expires_at = new Date(Date.now() + 15 * 60 * 1000);

  await customer.save();

  await sendEmailForgetPasswordEmployee(email, customer.password_token);

  res.json({ message: 'Password reset token sent' });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  const customer = await Employee.findOne({ where: { password_token: token } });

  if (!customer || customer.password_token_expires_at < new Date()) {
    return next(new AppError('Invalid or expired token', 400));
  }

  customer.password_token = null;
  customer.password_token_expires_at = null;
  customer.password = req.body.password;

  await customer.save();

  res.json({ message: 'Password reset successful' });
});

export const myProfile = catchAsync(async (req, res, next) => {
  const { customerId } = req.decodedData;

  const customer = await Employee.findByPk(customerId);

  if (!customer) {
    return next(new AppError('Customer not found', 404));
  }

  res.json({ customer });
});

export const updateProfile = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.location;
  }

  const { customerId } = req.decodedData;

  const customer = await Employee.findByPk(customerId);

  if (!customer) {
    return next(new AppError('Customer not found', 404));
  }

  await customer.update({ ...req.body });

  res.json({ customer });
});
