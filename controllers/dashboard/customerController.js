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
  req.body.image = req.file.location;
  console.log(req.body);
  const customer = await Customer.create({
    ...req.body,
  });
  res.json(customer);
});

const updateCustomer = catchAsync(async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (customer) {
    const updatedCustomer = await customer.update({
      ...req.body,
    });
    res.json(updatedCustomer);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

const deleteCustomer = catchAsync(async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (customer) {
    await customer.destroy();
    res.json({ message: 'Customer removed' });
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

export {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
