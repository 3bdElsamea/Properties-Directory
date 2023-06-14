import Report from '../../models/Report.js';
import catchAsync from '../../utils/catchAsync.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import Employee from '../../models/Employee.js';
import Customer from '../../models/Customer.js';

//Get all reports
const getAllReports = catchAsync(async (req, res, next) => {
  const obj = {
    include: [
      {
        model: Customer,
        attributes: ['name'],
      },
      {
        model: Employee,
        attributes: ['name'],
      },
    ],
  };
});
