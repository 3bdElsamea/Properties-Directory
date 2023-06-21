import { Op } from 'sequelize';

import PropertyGeneralRequest from '../../models/PropertyGeneralRequest.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import Customer from '../../models/Customer.js';
import Property from '../../models/Property.js';

const obj = {
  include: [
    {
      model: Customer,
      attributes: ['name', 'email', 'image'],
    },
    {
      model: Property,
      attributes: ['title', 'price'],
    },
  ],
};

const getAllGeneralRequests = catchAsync(async (req, res, next) => {
  const propertiesGeneralRequest = await new ApiFeatures(
    PropertyGeneralRequest,
    req.query,
    obj,
  ).get();

  res.json(propertiesGeneralRequest);
});

const getGeneralRequest = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const generalRequest = await PropertyGeneralRequest.findByPk(id, obj);

  if (!generalRequest) {
    return next(new AppError(`General Request Not Found`, 404));
  }
  res.json(generalRequest);
});

export { getAllGeneralRequests, getGeneralRequest };
