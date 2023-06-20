import express from 'express';

import { createContactUs } from '../../controllers/website/contactUsController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import { validationCreateContactUs } from '../../validation/validateContactUs.js';

const router = express.Router();

router.route('/').post(validationCreateContactUs, createContactUs);

export default router;
