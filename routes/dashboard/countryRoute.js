import express from 'express';
import {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
  toggleActive,
} from '../../controllers/dashboard/countryController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';

const router = express.Router();

router.route('/').get(getAllCountries).post(createCountry);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getCountryById)
  .patch(updateCountry)
  .delete(deleteCountry);

// Toggle active
router.route('/:id/toggle-active').patch(toggleActive);

export default router;
