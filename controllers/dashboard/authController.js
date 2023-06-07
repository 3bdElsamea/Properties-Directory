import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import Employee from '../../models/Employee.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import { sendEmailForgetPasswordEmployee } from '../../utils/emailSender.js';
import RolePermission from '../../models/RolePermission.js';
import Permission from '../../models/Permission.js';
import Role from '../../models/Role.js';

config();

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ where: { email: email, blocked: 0 } });

  if (!employee || !bcrypt.compareSync(password, employee.password)) {
    return next(new AppError('Invalid email or password', 400));
  }

  if (!employee.role_id) {
    return next(new AppError('You do not have any role', 401));
  }

  let role = await Role.findOne({
    where: { id: employee.role_id },
    attributes: ['id', 'name'],
    include: [
      {
        model: RolePermission,
        include: Permission,
      },
    ],
  });

  role = role.toJSON();
  role.RolePermissions = role.RolePermissions.map(
    (rolePermission) => rolePermission.Permission.name,
  );

  const token = jwt.sign(
    { employeeId: employee.id, role: role.name },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRE_IN,
    },
  );

  res.json({ token, permissions: role.RolePermissions });
});

export const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const employee = await Employee.findOne({ where: { email } });

  if (!employee) {
    return next(new AppError('No customer found with that email', 404));
  }

  employee.password_token = jwt.sign(
    { employeeId: employee.id },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '15m',
    },
  );

  employee.password_token_expires_at = new Date(Date.now() + 15 * 60 * 1000);

  await employee.save();

  await sendEmailForgetPasswordEmployee(email, employee.password_token);

  res.json({ message: 'Password reset token sent' });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  const employee = await Employee.findOne({ where: { password_token: token } });

  if (!employee || employee.password_token_expires_at < new Date()) {
    return next(new AppError('Invalid or expired token', 400));
  }

  employee.password_token = null;
  employee.password_token_expires_at = null;
  employee.password = req.body.password;

  await employee.save();

  res.json({ message: 'Password reset successful' });
});

export const myProfile = catchAsync(async (req, res, next) => {
  const { employeeId } = req.decodedData;

  const employee = await Employee.findByPk(employeeId);

  if (!employee) {
    return next(new AppError('Customer not found', 404));
  }

  res.json({ employee });
});

export const updateProfile = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.location;
  }

  const { employeeId } = req.decodedData;

  const employee = await Employee.findByPk(employeeId);

  if (!employee) {
    return next(new AppError('Customer not found', 404));
  }

  await employee.update({ ...req.body });

  res.json({ employee });
});
