import AppError from '../utils/appError.js';
const permissionMiddleware = (permission) => {
  return (req, res, next) => {
    const { permissions } = req.decodedData.permissions;

    if (!permissions.includes(permission)) {
      return next(new AppError('Not Have Permission', 403));
    }

    next();
  }
};

export default permissionMiddleware;
