import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Customer from '../../models/Employee.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findOne({ where: { email } });

    if (!customer || !bcrypt.compareSync(password, customer.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ customerId: customer.id }, 'your-secret-key', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

export const logout = async (req, res) => {
  jwt.destroy(req.token);
  res.json({ message: 'Logout successful' });
};

// Controller for requesting password reset
export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the customer with the provided email
    const customer = await Customer.findOne({ where: { email } });

    // If customer not found, return error response
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Generate and save a password reset token
    const resetToken = jwt.sign(
      { customerId: customer.id },
      'your-secret-key',
      { expiresIn: '15m' },
    );
    customer.password_token = resetToken;
    customer.password_token_expires_at = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await customer.save();

    // Send the reset token via email or other means
    // ...

    res.json({ message: 'Password reset token sent' });
  } catch (error) {
    console.error('Error during password reset request:', error);
    res.status(500).json({ message: 'Password reset request failed' });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const customer = await Customer.findOne({
      where: { password_token: token },
    });

    if (!customer || customer.password_token_expires_at < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    customer.password = hashedPassword;
    customer.password_token = null;
    customer.password_token_expires_at = null;
    await customer.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Password reset failed' });
  }
};

export const myProfile = async (req, res) => {
  const { customerId } = req.user;

  try {
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ customer });
  } catch (error) {
    console.error('Error retrieving customer profile:', error);
    res.status(500).json({ message: 'Failed to retrieve customer profile' });
  }
};

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { customerId } = req.user;

  try {
    const customer = await Customer.findByPk(customerId);

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
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Failed to update password' });
  }
};
