import express from 'express';
import {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  toggleActive,
} from '../../controllers/dashboard/countryController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import { validateCountryCreate, validateCountryUpdate } from '../../validation/validateCountry.js';

const router = express.Router();

router.route('/')
  .get(getAllCountries)
  .post(validateCountryCreate, createCountry);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getCountryById)
  .patch(validateCountryUpdate, updateCountry);

router.route('/:id/toggle-active').patch(toggleActive);

export default router;
