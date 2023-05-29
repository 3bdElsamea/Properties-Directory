import AppError from '../utils/appError.js';
export default (req, res, next) => {
  if (isNaN(req.params.id)) {
    return next(new AppError('Invalid ID', 400));
  }
  next();
}