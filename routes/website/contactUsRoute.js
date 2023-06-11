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

router
  .route('/')
  .get(getAllContactsUs)
  .post(validationCreateContactUs, createContactUs);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getContactUsById)
  .patch(validationUpdateContactUs, updateContactUs);

router
  .route('/:id/status')
  .all(idParmaMiddleware)
  .patch(validationUpdateContactUsStatus, statusContactUs);

export default router;
