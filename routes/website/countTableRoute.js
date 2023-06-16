import express from 'express';
import getCountTable from '../../controllers/dashboard/statisticController.js';
// import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
// import { validateCountryCreate, validateCountryUpdate } from '../../validation/validateCountry.js';

const router = express.Router();

router.route('/').get(getCountTable);

// router
//   .route('/:id')
//   .all(idParmaMiddleware)
//   .get(getCountryById)
//   .patch(validateCountryUpdate, updateCountry);

// router.route('/:id/toggle-active').patch(toggleActive);

export default router;
