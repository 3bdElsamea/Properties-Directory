import express from 'express';
import bodyParser from 'body-parser';
import dashboardRoute from './routes/dashboard.js';
import websiteRoute from './routes/website.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import trimMiddleware from './middlewares/trimMiddleware.js';

const router = express.Router();

router.use(express.json({ limit: '10kb' }));
router.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));


router.use(trimMiddleware);

router.use('/', websiteRoute);
router.use('/dashboard', dashboardRoute);

router.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

router.use(globalErrorHandler);

export default router;
