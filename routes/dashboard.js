import express from 'express';
import authRoute from './dashboard/authRoute.js';
import customerRoute from './dashboard/customerRoute.js';
import countryRoute from './dashboard/countryRoute.js';
import cityRoute from './dashboard/cityRoute.js';
import ownerRoute from './dashboard/ownerRoute.js';
import propertyRoute from './dashboard/propertyRoute.js';
import roleRoute from './dashboard/roleRoute.js';
import employeeRoute from './dashboard/employeeRoute.js';
import categoryRoute from './dashboard/categoryRoute.js';


const router = express.Router();

router.use('/auth', authRoute);
router.use('/roles', roleRoute);
router.use('/customers', customerRoute);
router.use('/employees', employeeRoute);
router.use('/categories', categoryRoute);
router.use('/countries', countryRoute);
router.use('/cities', cityRoute);
router.use('/owners', ownerRoute);
router.use('/properties', propertyRoute);

export default router;
