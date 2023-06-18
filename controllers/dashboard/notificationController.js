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
};

const getAllNotifications = catchAsync(async (req, res) => {
  const notifications = await Notification.findAll(obj);
  // Get the count of read notifications only from notifications object
  const readNotifications = notifications.filter(
    (notification) => notification.is_read === 1,
  );
  res.json({
    notifications,
    readNotifications: readNotifications.length,
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
  console.log('Hello ............ ..   ....', req.body);
  const updatedNotification = await notification.update(req.body);

  res.json(updatedNotification);
});

export { getAllNotifications, getNotification, updateNotification };
