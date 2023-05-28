import express from 'express';
import dashboardRoute from './routes/dashboard.js';
import websiteRoute from './routes/dashboard.js';

const router = express.Router();

router.use('/', websiteRoute);
router.use('/dashboard', dashboardRoute);

// Error handling
router.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).json({ error: 'Internal Server Error' });
  } else {
    console.error(err);
    return res.status(500).json({ error: err });
  }
});

export default router;
