import express from 'express';
import {
  getAllNotifications,
  updateNotification,
  getNotification,
} from '../../controllers/dashboard/notificationController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';

const router = express.Router();

router.route('/').get(getAllNotifications);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getNotification)
  .patch(updateNotification);

export default router;
