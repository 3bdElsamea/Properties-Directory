import express from 'express';
import authRoute from './dashboard/test.js';

const router = express.Router();

router.get('/auth', authRoute);

export default router;
