import express from 'express';
import authRoute from './website/authRoute.js';
import { getGeneralSetting } from '../controllers/generalSettingController.js';
import ContactUsRoute from '../routes/website/contactUsRoute.js';
import propertyRoute from '../routes/website/propertyRoute.js';
import requestRoute from './website/requestRoute.js';
import activeCitiesRoute from './website/activeCitiesRoute.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import chatRoute from './website/chatRoute.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/data', getGeneralSetting);
router.use('/contact-us', ContactUsRoute);
router.use('/properties', propertyRoute);
router.use('/requests', authMiddleware, requestRoute);
router.use('/activeCities', activeCitiesRoute);
router.use('/chat', authMiddleware, chatRoute);
export default router;
