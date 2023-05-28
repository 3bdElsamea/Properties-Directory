import express from 'express';
import authRoute from './dashboard/userRoute.js';

const router = express.Router();

router.use('/auth', authRoute);

export default router;
