import express from 'express';
import authRoute from './dashboard/userRoute.js';
import customerRoute from './dashboard/customerRoute.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/customers', customerRoute);

export default router;
