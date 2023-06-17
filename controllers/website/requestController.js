import catchAsync from '../../utils/catchAsync.js';
import createReport from '../../utils/report.js';
import PropertyRequest from '../../models/PropertyRequest.js';
import Property from '../../models/Property.js';
import Notification from '../../models/Notification.js';
import Pusher from 'pusher';

// Pusher Config
const pusher = new Pusher({
  appId: '1620529',
  key: 'fb1c526a7f07ebcc0179',
  secret: 'ca89ac951f6771fb2686',
  cluster: 'eu',
  useTLS: true,
});
const createPropertyRequest = catchAsync(async (req, res) => {
  const propertyRequest = await PropertyRequest.create({
    customer_id: req.decodedData.customerId,
    property_id: req.params.id,
    status: 'pending',
  });
  await createReport(
    req,
    'created a new property request with id ' + propertyRequest.id,
  );
  await Notification.create({
    customer_id: req.decodedData.customerId,
    title: 'New Property Request',
    message: `New request for Property with id ${propertyRequest.property_id} from Customer with id ${propertyRequest.customer_id}`,
  });
  await pusher.trigger('property-request', 'new-request', {
    message: `New request for Property with id ${propertyRequest.property_id} from Customer with id ${propertyRequest.customer_id}`,
  });

  res.json(propertyRequest);
});

const getAllPropertyRequests = catchAsync(async (req, res) => {
  const propertyRequests = await PropertyRequest.findAll({
    include: [
      {
        model: Property,
        attributes: ['title'],
      },
    ],
    where: { customer_id: req.decodedData.customerId },
  });
  res.json(propertyRequests);
});

export { createPropertyRequest, getAllPropertyRequests };
