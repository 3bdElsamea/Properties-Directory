import express from 'express';
import authRoute from './dashboard/authRoute.js';
import customerRoute from './dashboard/customerRoute.js';
import countryRoute from './dashboard/countryRoute.js';
import cityRoute from './dashboard/cityRoute.js';
import ownerRoute from './dashboard/ownerRoute.js';
import propertyRoute from './dashboard/propertyRoute.js';
import roleRoute from './dashboard/roleRoute.js';
import employeeRoute from './dashboard/employeeRoute.js';
import categoryRoute from './dashboard/categoryRoute.js';
import { uploadImage } from '../utils/uploadImage.js';
import getAllReports from '../controllers/dashboard/reportController.js';
import validationGeneralSetting from '../validation/validationGeneralSetting.js';
import { updateGeneralSetting } from '../controllers/generalSettingController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import permissionMiddleware from '../middlewares/permissionMiddleware.js';
import propertyImageRoute from './dashboard/properityImageRoute.js';
import propertyRequestRoute from './dashboard/propertyRequestRoute.js';
import notificationRoute from './dashboard/notificationRoute.js';
import getStatistic from '../controllers/dashboard/statisticController.js';
import { getAllContactsUs } from '../controllers/website/contactUsController.js';

const router = express.Router();

router.use('/auth', authRoute);

router.use(authMiddleware);

router.use('/roles', permissionMiddleware('role'), roleRoute);
router.use('/customers', permissionMiddleware('customer'), customerRoute);
router.use('/employees', permissionMiddleware('employee'), employeeRoute);
router.use('/categories', permissionMiddleware('category'), categoryRoute);
router.use('/countries', permissionMiddleware('country'), countryRoute);
router.use('/cities', permissionMiddleware('city'), cityRoute);
router.use('/owners', permissionMiddleware('owner'), ownerRoute);
router.use('/properties', permissionMiddleware('property'), propertyRoute);
router.use(
  '/notifications',
  permissionMiddleware('notification'),
  notificationRoute,
);
router.use(
  '/property-requests',
  permissionMiddleware('property_request'),
  propertyRequestRoute,
);
router.get('/reports', permissionMiddleware('report'), getAllReports);
router.get('/statistic', getStatistic);
router.get(
  '/contact-us',
  permissionMiddleware('static_page'),
  getAllContactsUs,
);
router.use(
  '/property-images',
  permissionMiddleware('property'),
  propertyImageRoute,
);

router.patch(
  '/data',
  uploadImage.single('logo'),
  validationGeneralSetting,
  updateGeneralSetting,
);

export default router;
