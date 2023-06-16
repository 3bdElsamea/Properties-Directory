import express from 'express';
import authRoute from './website/authRoute.js';
import { getGeneralSetting } from '../controllers/generalSettingController.js';
import  ContactUsRoute  from '../routes/website/contactUsRoute.js';
import couuntTableRoute from '../routes/website/countTableRoute.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/data', getGeneralSetting);
router.use('/ContactsUs', ContactUsRoute);
router.use('/countes',couuntTableRoute );

export default router;
