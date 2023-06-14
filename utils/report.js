import Report from '../models/Report.js';
import catchAsync from './catchAsync.js';
import Customer from '../models/Customer.js';

const createReport = catchAsync(async (req, res, next, action) => {
  const customer = await Customer.findByPk(req.user.id);
  await Report.create({
    action,
    customer_id: customer ? customer.id : null,
    employee_id: !customer ? req.user.id : null,
  });
  next();
});

export default createReport;
