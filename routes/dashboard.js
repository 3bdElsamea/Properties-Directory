import express from 'express';
import { exec } from 'child_process';
import authRoute from './dashboard/userRoute.js';
import customerRoute from './dashboard/customerRoute.js';
import categoryRoute from './dashboard/categoryRoute.js';
import pageRoute from './dashboard/pageRoute.js';
import propertyMatchingRoute from './dashboard/propertyMatchingRoute.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/customers', customerRoute);
router.use('/categories', categoryRoute);
router.use('/pages', pageRoute);
router.use('/propertiesmatching', propertyMatchingRoute);

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
