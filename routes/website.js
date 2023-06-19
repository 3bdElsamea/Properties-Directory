import express from 'express';
import authRoute from './website/authRoute.js';
import { getGeneralSetting } from '../controllers/generalSettingController.js';
import ContactUsRoute from '../routes/website/contactUsRoute.js';
import propertyRoute from '../routes/website/propertyRoute.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/data', getGeneralSetting);
router.use('/ContactsUs', ContactUsRoute);
router.use('/properties', propertyRoute);

export default router;
