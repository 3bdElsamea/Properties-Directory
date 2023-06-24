import catchAsync from '../../utils/catchAsync.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';
import createReport from '../../utils/report.js';
import PropertyRequest from '../../models/PropertyRequest.js';
import Property from '../../models/Property.js';
import Customer from '../../models/Customer.js';

const obj = {
  include: [
    {
      model: Property,
      attributes: ['title'],
    },
    {
      model: Customer,
      attributes: ['name'],
    },
  ],
};

const getAllPropertyRequests = catchAsync(async (req, res) => {
  const propertyRequests = await new ApiFeatures(PropertyRequest, req.query, {
    ...obj,
  }).get();
  res.json(propertyRequests);
});

const updatePropertyRequest = catchAsync(async (req, res, next) => {
  const propertyRequest = await PropertyRequest.findByPk(req.params.id);
  if (!propertyRequest) {
    return next(new AppError('No property request found with that ID', 404));
  }
  console.log('...............', req.body.status);
  const updatedPropertyRequest = await propertyRequest.update({
    status: req.body.status,
  });
  await createReport(req, 'updated property request with id ' + req.params.id);
  res.json(updatedPropertyRequest);
});

const deletePropertyRequest = catchAsync(async (req, res, next) => {
  const propertyRequest = await PropertyRequest.findByPk(req.params.id);
  if (!propertyRequest) {
    return next(new AppError('No property request found with that ID', 404));
  }
  await propertyRequest.destroy();
  await createReport(req, 'deleted property request with id ' + req.params.id);
  res.json({ message: 'Property request deleted successfully' });
});

export { getAllPropertyRequests, updatePropertyRequest, deletePropertyRequest };
