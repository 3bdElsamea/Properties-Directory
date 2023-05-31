import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import Employee from '../models/Employee.js';
import RolePermission from '../models/RolePermission.js';
import Permission from '../models/Permission.js';
import Customer from '../models/Customer.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Access denied', 401));
  }

  const token = authHeader.split(' ')[1];
  try {
    req.decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
    if(req.decodedData.employeeId){
      const employee = await Employee.findOne({
        where: { id: req.decodedData.id },
      })

      if (!employee) {
        return next(new AppError('Employee not found', 404));
      }

      req.decodedData.employee = employee;

      let role_permissions = await RolePermission.findOne({
        where: { role_id: employee.role_id },
        attributes: ['id', 'role_id', 'permission_id'],
        include: Permission,
      });

      req.decodedData.permissions = role_permissions.toJSON().map(
        (rolePermission) => rolePermission.Permission.name,
      );
    }else{
      const customer = await Customer.findOne({
        where: { id: req.decodedData.id },
      })

      if (!customer) {
        return next(new AppError('User not found', 404));
      }

      req.decodedData.customer = customer;
    }

    next();
  } catch (error) {
    return next(new AppError('Invalid token', 400));
  }
};

export default authMiddleware;
