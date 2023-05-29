import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Employee from '../../models/Employee.js';
import catchAsync from '../../utils/catchAsync.js';

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const customer = await Employee.findOne({ where: { email } });

  if (!customer || !bcrypt.compareSync(password, customer.password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ customerId: customer.id }, 'your-secret-key', { expiresIn: '1h' });

  res.json({ token });
});

export const logout = catchAsync(async (req, res, next) => {
  res.json({ message: 'Logout successful' });
});

export const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const customer = await Employee.findOne({ where: { email } });

  // If customer not found, return error response
  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  // Generate and save a password reset token
  const resetToken = jwt.sign({ customerId: customer.id }, 'your-secret-key', { expiresIn: '15m' });
  customer.password_token = resetToken;
  customer.password_token_expires_at = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  await customer.save();

  // Send the reset token via email or other means
  // ...

  res.json({ message: 'Password reset token sent' });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const { token, newPassword } = req.body;
  const customer = await Employee.findOne({ where: { password_token: token } });

  if (!customer || customer.password_token_expires_at < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  customer.password = hashedPassword;
  customer.password_token = null;
  customer.password_token_expires_at = null;
  await customer.save();

  res.json({ message: 'Password reset successful' });
});

export const myProfile = catchAsync(async (req, res, next) => {

  const { customerId } = req.user;

  try {
    const customer = await Employee.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ customer });
  } catch (error) {
    console.error('Error retrieving customer profile:', error);
    res.status(500).json({ message: 'Failed to retrieve customer profile' });
  }
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const { customerId } = req.user;

  const customer = await Employee.findByPk(customerId);

  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  if (!bcrypt.compareSync(currentPassword, customer.password)) {
    return res.status(401).json({ message: 'Invalid current password' });
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  customer.password = hashedPassword;
  await customer.save();

  res.json({ message: 'Password updated successfully' });
});
