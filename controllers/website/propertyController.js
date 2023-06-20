import Property from '../../models/Property.js';
import Category from '../../models/Category.js';
import City from '../../models/City.js';
import PropertyImage from '../../models/PropertyImage.js';
import catchAsync from '../../utils/catchAsync.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';
import Country from '../../models/Country.js';

const obj = {
  include: [
    {
      model: Category,
      attributes: ['name'],
    },
    {
      model: City,
      attributes: ['name'],
      include: [
        {
          model: Country,
          attributes: ['name'],
        },
      ],
    },
  ],
};

const getAllActiveProperties = catchAsync(async (req, res) => {
  req.query.status = 'active';
  const properties = await new ApiFeatures(Property, req.query, obj).get();
  res.json(properties);
});

const getLastFiveProperties = catchAsync(async (req, res) => {
  req.query = { limit: '5', sort: 'created_at', status: 'active' };
  const properties = await new ApiFeatures(Property, req.query, obj).get();
  res.json(properties);
});

const getPropertyById = catchAsync(async (req, res, next) => {
  const newObj = {
    ...obj,
    include: [{ model: PropertyImage, attributes: ['id', 'image'] }],
  };
  const property = await Property.findByPk(req.params.id, newObj);
  if (!property) {
    return next(new AppError('Property not found', 404));
  }
  if (property.status === 'inactive') {
    return next(new AppError('Property is not active', 404));
  }
  res.json(property);
});

export { getLastFiveProperties, getAllActiveProperties, getPropertyById };
