import Employee from '../../models/Employee.js';
import catchAsync from '../../utils/catchAsync.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';
import Role from '../../models/Role.js';

const obj = {
  include: [
    {
      model: Role,
      attributes: ['name'],
    },
  ],
};

const getAllEmployees = catchAsync(async (req, res) => {
  const employees = await new ApiFeatures(Employee, req.query, obj).get();
  res.json(employees);
});

const getEmployeeById = catchAsync(async (req, res, next) => {
  const employee = await Employee.findByPk(req.params.id, obj);
  if (!employee) {
    return next(new AppError('Employee not found', 404));
  }
  res.json(employee);
});

const createEmployee = catchAsync(async (req, res) => {
  if (req.file) req.body.image = req.file.location;
  const employee = await Employee.create({
    ...req.body,
  });
  res.json(employee);
});

const updateEmployee = catchAsync(async (req, res, next) => {
  console.log('updateEmployee');
  const employee = await Employee.findByPk(req.params.id);
  if (!employee) {
    return next(new AppError('Employee not found', 404));
  }
  if (req.file) req.body.image = req.file.location;
  const updatedEmployee = await employee.update({
    ...req.body,
  });
  res.json(updatedEmployee);
});

const deleteEmployee = catchAsync(async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  if (employee) {
    await employee.destroy();
    res.json({ message: 'Employee removed' });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

export {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
