import express from 'express';
import dashboardRoute from './routes/dashboard.js';
import websiteRoute from './routes/dashboard.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

const router = express.Router();

router.use('/', websiteRoute);
router.use('/dashboard', dashboardRoute);

router.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

router.use(globalErrorHandler);

export default router;
