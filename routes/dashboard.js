import express from 'express';
import authRoute from './dashboard/userRoute.js';
import customerRoute from './dashboard/customerRoute.js';
import countryRoute from './dashboard/countryRoute.js';
import cityRoute from './dashboard/cityRoute.js';
import ownerRoute from './dashboard/ownerRoute.js';
import propertyRoute from './dashboard/propertyRoute.js';
import { exec } from 'child_process';
import app from '../server.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/customers', customerRoute);
router.use('/countries', countryRoute);
router.use('/cities', cityRoute);
router.use('/owners', ownerRoute);
router.use('/properties', propertyRoute);

router.get('/excused-git-pull', (req, res) => {
  exec('git pull origin backend', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing git pull: ${error.message}`);
      return res.status(500).send('Failed to execute git pull');
    }
    console.log('Git pull successful');
    res.send('Git pull successful');
  });
});

export default router;
