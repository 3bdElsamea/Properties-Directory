import express from 'express';

import {
  getAllContactsUs,
  createContactUs,
  getContactUsById,
  updateContactUs,
  statusContactUs,
} from '../../controllers/website/contactUsController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import {
  validationCreateContactUs,
  validationUpdateContactUs,
  validationUpdateContactUsStatus,
} from '../../validation/validateContactUs.js';

const router = express.Router();

router.route('/').post(validationCreateContactUs, createContactUs);

export default router;
