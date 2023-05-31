import express from 'express';
import {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
  toggleActive,
} from '../../controllers/dashboard/cityController.js';

const router = express.Router();

router.route('/').get(getAllCities).post(createCity);
router.route('/:id').get(getCityById).put(updateCity).delete(deleteCity);

router.route('/:id/toggle-active').patch(toggleActive);

export default router;
