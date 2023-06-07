import express from 'express';
import authRoute from './website/authRoute.js';
import { getGeneralSetting } from '../controllers/generalSettingController.js';
import  ContactUsRoute  from '../routes/website/contactUsRoute.js';
const router = express.Router();

router.get('/auth', authRoute);
router.get('/data', getGeneralSetting);
router.use('/ContactsUs', ContactUsRoute);

export default router;
