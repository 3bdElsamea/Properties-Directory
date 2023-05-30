import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Access denied', 401));
  }

  const token = authHeader.split(' ')[1];
  try {
    req.decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
    // Todo: Check if user exists

    // Todo: Check if employee is not blocked

    // Todo: Load employee's permissions

    next();
  } catch (error) {
    return next(new AppError('Invalid token', 400));
  }
};

export default authMiddleware;