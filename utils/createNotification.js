import Notification from '../models/Notification.js';
import pusher from '../config/pusher.js';
const createNotification = async (customerId, title, message) => {
  try {
    const notification = await Notification.create({
      customer_id: customerId,
      title: title,
      message: message,
    });
    await pusher.trigger('property-request', 'new-request', {
      id: notification.id,
      title: notification.title,
      message: notification.message,
    });
  } catch (err) {
    console.log(err);
  }
};

export default createNotification;
