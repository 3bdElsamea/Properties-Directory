import Property from '../../models/Property.js';
import Category from '../../models/Category.js';
import City from '../../models/City.js';
import Owner from '../../models/Owner.js';
import Employee from '../../models/Employee.js';
import PropertyImage from '../../models/PropertyImage.js';
import catchAsync from '../../utils/catchAsync.js';
// import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';

const getAllProperties = catchAsync(async (req, res) => {
  const properties = await Property.findAll({
    include: [
      {
        model: Category,
        attributes: ['name'],
      },
      {
        model: City,
        attributes: ['name'],
      },
      {
        model: Owner,
        attributes: ['name'],
      },
      {
        model: Employee,
        attributes: ['name'],
      },
    ],
  });
  res.json(properties);
});

const getPropertyById = catchAsync(async (req, res, next) => {
  const property = await Property.findByPk(req.params.id, {
    include: [
      {
        model: PropertyImage,
        attributes: ['image', 'id'],
      },
    ],
  });
  if (!property) {
    return next(new AppError('Property not found', 404));
  }
  res.json(property);
});

const createProperty = catchAsync(async (req, res, next) => {
  const slug = await uniqueSlug(Property, req.body.title);
  req.file ? (req.body.image = req.file.location) : null;
  const property = await Property.create({
    ...req.body,
  });
  res.json(property);
});

const updateProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findByPk(req.params.id);
  if (property) {
    req.file ? (req.body.image = req.file.location) : null;
    const updatedProperty = await property.update({
      ...req.body,
    });
    res.json(updatedProperty);
  } else {
    return next(new AppError('Property not found', 404));
  }
});

export { getAllProperties, getPropertyById, createProperty, updateProperty };
