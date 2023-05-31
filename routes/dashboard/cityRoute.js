import express from 'express';
import {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  toggleActive,
} from '../../controllers/dashboard/cityController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import { validateCityCreate, validateCityUpdate } from '../../validation/validateCity.js';

const router = express.Router();

router.route('/').get(getAllCities).post(validateCityCreate, createCity);
router.route('/:id').all(idParmaMiddleware).get(getCityById).patch(validateCityUpdate, updateCity);

router.route('/:id/toggle-active').patch(idParmaMiddleware, toggleActive);

export default router;
