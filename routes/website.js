import express from 'express';
import authRoute from './website/authRoute.js';
import { getGeneralSetting } from '../controllers/generalSettingController.js';
import ContactUsRoute from '../routes/website/contactUsRoute.js';
import couuntTableRoute from '../routes/website/countTableRoute.js';
import propertyRoute from '../routes/website/propertyRoute.js';

const router = express.Router();

router.get('/auth', authRoute);
router.get('/data', getGeneralSetting);
router.use('/ContactsUs', ContactUsRoute);
router.use('/countes', couuntTableRoute);
router.use('/properties', propertyRoute);

export default router;
