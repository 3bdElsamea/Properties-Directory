import express from 'express';
import authRoute from './website/authRoute.js';
import { getGeneralSetting } from '../controllers/generalSettingController.js';
import ContactUsRoute from '../routes/website/contactUsRoute.js';
import countTableRoute from '../routes/website/countTableRoute.js';
import propertyRoute from '../routes/website/propertyRoute.js';
import requestRoute from './website/requestRoute.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/data', getGeneralSetting);
router.use('/ContactsUs', ContactUsRoute);
router.use('/countes', countTableRoute);
router.use('/properties', propertyRoute);
router.use('/requests', authMiddleware, requestRoute);

export default router;
