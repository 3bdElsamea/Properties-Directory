import express from 'express';
import authRoute from './website/authRoute.js';
import { getGeneralSetting } from '../controllers/generalSettingController.js';
const router = express.Router();

router.get('/auth', authRoute);
router.get('/data', getGeneralSetting);


export default router;
