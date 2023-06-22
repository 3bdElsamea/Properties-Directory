import Notification from '../../models/Notification.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import Customer from '../../models/Customer.js';

const obj = {
  include: [
    {
      model: Customer,
      attributes: ['name'],
    },
  ],
  order: [['created_at', 'DESC']],
};

const getAllNotifications = catchAsync(async (req, res) => {
  const notifications = await Notification.findAll(obj);
  const unreadNotifications = notifications.filter(
    (notification) => notification.is_read === 0,
  );
  res.json({
    total_notifications: notifications.length,
    unread_notifications: unreadNotifications.length,
    notifications,
  });
});

const getNotification = catchAsync(async (req, res, next) => {
  const notification = await Notification.findByPk(req.params.id, obj);
  if (!notification) {
    return next(new AppError('No notification found with that ID', 404));
  }
  res.json(notification);
});

const updateNotification = catchAsync(async (req, res, next) => {
  const notification = await Notification.findByPk(req.params.id);
  if (!notification) {
    return next(new AppError('No notification found with that ID', 404));
  }

  if (notification.is_read) {
    return res.json('Notification is already read');
  }

  const updatedNotification = await notification.update(req.body);

  res.json(updatedNotification);
});

export { getAllNotifications, getNotification, updateNotification };
