import Report from '../models/Report.js';
import catchAsync from './catchAsync.js';

// const createReport = (action) => {
//   return catchAsync(async (req, res, next) => {
//     const employee = req.decodedData?.employeeId;
//     const customer = req.decodedData?.customerId;
//     console.log('..................', employee, customer, action);
//   });
// };
const createReport = async (req, action) => {
  const employee = req.decodedData?.employeeId;
  const customer = req.decodedData?.customerId;
  if (employee) {
    await Report.create({
      action,
      employee_id: employee,
    });
  } else if (customer) {
    await Report.create({
      action,
      customer_id: customer,
    });
  }
};

export default createReport;
