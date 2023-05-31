import Customer from '../../models/Customer.js';
import catchAsync from '../../utils/catchAsync.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';

const getAllCustomers = catchAsync(async (req, res) => {
  const customers = await new ApiFeatures(Customer, req.query).get();
  res.json(customers);
});

const getCustomerById = catchAsync(async (req, res, next) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) {
    return next(new AppError('Customer not found', 404));
  }
  res.json(customer);
});

const createCustomer = catchAsync(async (req, res) => {
  if (req.file) req.body.image = req.file.location;
  const customer = await Customer.create({
    ...req.body,
  });
  res.json(customer);
});

const updateCustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) {
    return next(new AppError('Customer not found', 404));
  }
  if (req.file) req.body.image = req.file.location;
  const updatedCustomer = await customer.update({
    ...req.body,
  });
  res.json(updatedCustomer);
});

const deleteCustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.findByPk(req.params.id);
  if (customer) {
    await customer.destroy();
    res.json({ message: 'Customer removed' });
  } else return next(new AppError('Customer not found', 404));
});

export {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
