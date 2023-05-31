import { Op } from 'sequelize';

import PropertyGeneralRequest from '../../models/PropertyGeneralRequest.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import Customer from '../../models/Customer.js';
import Property from '../../models/Property.js';

const getAllProperties = catchAsync(async (req, res, next) => {
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

  const propertiesGeneralRequest = await new ApiFeatures(PropertyGeneralRequest, req.query, obj).get();

  res.json(propertiesGeneralRequest);
});

const getPropertyById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const getPropertyById = await PropertyGeneralRequest.findByPk(id, {
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
  });

  if (!getPropertyById) {
    return next(new AppError(`Property with this id ${id} not found`, 404));
  }
  res.json(getPropertyById);
});


const matchingProperty = catchAsync(async (req, res, next) => {
  const queryStringObj = { ...req.query };
  const excludesField = ['bathrooms', 'bedrooms', 'year_built' , 'garage' , 'floors'];

  excludesField.forEach((field) =>  queryStringObj[field]);

  console.log('Excluded fields:', excludesField);
  console.log('Original request query:', req.query);
  console.log('Filtered query object:', queryStringObj);

  const whereClause = Object.entries(queryStringObj).reduce((acc, [key, value]) => {
    acc[key] = { [Op.eq]: value };
    return acc;
  }, {});

  const matchingProperties = await PropertyGeneralRequest.findAll({
    where: whereClause,
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
  });

  res.json(matchingProperties);
});


export { getAllProperties, getPropertyById, matchingProperty };
