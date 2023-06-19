import express from 'express';
import getCountTable from '../../controllers/dashboard/statisticController.js';

const router = express.Router();

router.route('/').get(getCountTable);

export default router;
