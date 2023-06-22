import Employee from '../../models/Employee.js';
import catchAsync from '../../utils/catchAsync.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';
import Role from '../../models/Role.js';
import createReport from '../../utils/report.js';

const obj = {
  include: [
    {
      model: Role,
      attributes: ['name'],
    },
  ],
};

const getAllEmployees = catchAsync(async (req, res) => {
  const employees = await new ApiFeatures(Employee, req.query, {
    ...obj,
  }).get();
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
  await createReport(req, `created employee named ${employee.name}`);
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
  if (req.body.blocked) {
    await createReport(
      req,
      `Changed the status of the employee named ${updatedEmployee.name}`,
    );
  } else {
    await createReport(req, `updated employee named ${updatedEmployee.name}`);
  }
  res.json(updatedEmployee);
});

const deleteEmployee = catchAsync(async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  if (employee) {
    await employee.destroy();
    await createReport(req, `deleted employee named ${employee.name}`);
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
