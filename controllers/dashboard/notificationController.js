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
  const notifications = await Notification.findAll({});
  res.json(notifications);
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
    return next(new AppError('Notification already read', 400));
  }
  const updatedNotification = await notification.update(req.body.is_read);

  res.json(updatedNotification);
});

export { getAllNotifications, getNotification, updateNotification };
