import express from 'express';
import getAllActiveCities from '../../controllers/website/cityController.js';

const router = express.Router();

router.get('/', getAllActiveCities);

export default router;
