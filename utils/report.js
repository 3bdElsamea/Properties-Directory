import Report from '../models/Report.js';
import catchAsync from './catchAsync.js';

const createReport = catchAsync(async (req, res, next, action) => {
  const employee = req.decodedData.employeeId;
  const customer = req.decodedData.customerId;
  if(employee){
    await Report.create({
      action,
      employee_id: employee
    });
  }else if(customer){
    await Report.create({
      action,
      customer_id: customer
    });
  }
  next();
});

export default createReport;
