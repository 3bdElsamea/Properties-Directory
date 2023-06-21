import catchAsync from '../../utils/catchAsync.js';
import createReport from '../../utils/report.js';
import PropertyRequest from '../../models/PropertyRequest.js';
import Property from '../../models/Property.js';
import sequelize from '../../config/DBConnection.js';
import AppError from '../../utils/appError.js';
import createNotification from '../../utils/createNotification.js';
import Customer from '../../models/Customer.js';

const createPropertyRequest = catchAsync(async (req, res, next) => {
  const customerId = req.decodedData.customerId;
  const propertyId = req.params.id;

  //
  // const query = `
  //     WITH ins AS (
  //     INSERT INTO property_requests (customer_id, property_id, status)
  //     SELECT ${customerId}, ${propertyId}, 'pending'
  //   WHERE NOT EXISTS (
  //       SELECT 1
  //       FROM property_requests
  //       WHERE customer_id = ${customerId}
  //             AND property_id = ${propertyId}
  //             AND status = 'pending'
  //             )
  //             RETURNING *
  //             )
  //     SELECT *
  //     FROM ins
  //     UNION ALL
  //     SELECT *
  //     FROM property_requests
  //     WHERE customer_id = ${customerId}
  //       AND property_id = ${propertyId}
  //       AND status = 'pending'
  //         LIMIT 1
  // `;
  //
  // const propertyRequest = await sequelize.query(query, {
  //   type: sequelize.QueryTypes.INSERT,
  //   model: PropertyRequest,
  //   mapToModel: true,
  // });
  //
  // if (propertyRequest === []) {
  //   return res
  //     .status(400)
  //     .json({ error: 'You already have a pending request for this property.' });
  // }

  const existingRequest = await PropertyRequest.findOne({
    where: {
      customer_id: customerId,
      property_id: propertyId,
      status: 'pending',
    },
  });

  if (existingRequest) {
    return next(
      new AppError(
        'You already have a pending request for this property.',
        400,
      ),
    );
  }

  const propertyRequest = await PropertyRequest.create({
    customer_id: customerId,
    property_id: propertyId,
    status: 'pending',
  });

  await createReport(
    req,
    'made a new property request with id ' +
      propertyRequest.id +
      ' for property with id ' +
      req.params.id,
  );
  // Get the property name only
  const property = await Property.findByPk(req.params.id, {
    attributes: ['title'],
  });
  // get the customer name only
  const customer = await Customer.findByPk(customerId, {
    attributes: ['name'],
  });
  const title = 'New Property Request';
  const message = `New request for Property ${property.title} from Customer ${customer.name}`;
  await createNotification(customerId, title, message);

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
