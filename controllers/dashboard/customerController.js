import bcrypt from 'bcrypt';
import Customer from '../../models/Customer.js';
import AppError from '../../utils/appError.js';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, salt),
      image: req.body.image,
      username: req.body.username,
    });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const hashedPassword = req.body.password
      ? bcrypt.hashSync(req.body.password, salt)
      : '';
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      const updatedCustomer = await customer.update({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        image: req.body.image,
        username: req.body.username,
      });
      res.json(updatedCustomer);
    } else {
      next(new AppError('Customer not found', 404));
    }
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      await customer.destroy();
      res.json({ message: 'Customer removed' });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
