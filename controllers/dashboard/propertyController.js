import Property from '../../models/Property.js';
import Category from '../../models/Category.js';
import City from '../../models/City.js';
import Owner from '../../models/Owner.js';
import Employee from '../../models/Employee.js';
import checkFkExists from '../../utils/checkFkExists.js';
import catchAsync from '../../utils/catchAsync.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';
import uniqueSlug from '../../utils/uniqueSlug.js';

const getAllProperties = catchAsync(async (req, res) => {
  const properties = await new ApiFeatures(Property, req.query).get();
  res.json(properties);
});

const getPropertyById = catchAsync(async (req, res, next) => {
  const property = await Property.findByPk(req.params.id);
  if (!property) {
    return next(new AppError('Property not found', 404));
  }
  res.json(property);
});

const checkKeys = catchAsync(async (req, res, next) => {
  const { category_id, city_id, owner_id, employee_id } = req.body;

  category_id
    ? await checkFkExists(Category, category_id, req, res, next)
    : null;
  city_id ? await checkFkExists(City, city_id, req, res, next) : null;
  owner_id ? await checkFkExists(Owner, owner_id, req, res, next) : null;
  employee_id
    ? await checkFkExists(Employee, employee_id, req, res, next)
    : null;
});

const createProperty = catchAsync(async (req, res, next) => {
  // await checkKeys(req, res, next);
  const slug = await uniqueSlug(Property, req.body.title);
  console.log(req.body.title, slug)
  // req.body.image = req.file.location;
  const property = await Property.create({
    ...req.body,
    slug,
  });
  res.json(property);
});

const updateProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findByPk(req.params.id);
  let slug;
  if (req.body.title) {
    slug = await uniqueSlug(Property, req.body.title);
    delete req.body.slug;
  }
  if (property) {
    await checkKeys(req, res, next);
    req.file ? (req.body.image = req.file.location) : null;
    const updatedProperty = await property.update({
      ...req.body,
      slug,
    });
    res.json(updatedProperty);
  } else {
    return next(new AppError('Property not found', 404));
  }
});

export { getAllProperties, getPropertyById, createProperty, updateProperty };
