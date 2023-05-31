import express from 'express';
import authRoute from './dashboard/authRoute.js';
import customerRoute from './dashboard/customerRoute.js';
import countryRoute from './dashboard/countryRoute.js';
import cityRoute from './dashboard/cityRoute.js';
import ownerRoute from './dashboard/ownerRoute.js';
import propertyRoute from './dashboard/propertyRoute.js';
import propertyImageRoute from './dashboard/properityImageRoute.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/customers', customerRoute);
router.use('/countries', countryRoute);
router.use('/cities', cityRoute);
router.use('/owners', ownerRoute);
router.use('/properties', propertyRoute);
router.use('/property-images', propertyImageRoute);

export default router;
