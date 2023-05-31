import City from '../../models/City.js';
import catchAsync from '../../utils/catchAsync.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';

const getAllCities = catchAsync(async (req, res) => {
  const cities = await new ApiFeatures(City, req.query).get();
  res.json(cities);
});

const getCityById = catchAsync(async (req, res, next) => {
  const city = await City.findByPk(req.params.id);
  if (!city) {
    return next(new AppError('City not found', 404));
  }
  res.json(city);
});

const createCity = catchAsync(async (req, res, next) => {
  const { name, country_id } = req.body;
  const city = await City.create({
    name,
    country_id,
  });
  res.json(city);
});

const updateCity = catchAsync(async (req, res, next) => {
  const { name, country_id } = req.body;
  const { id } = req.params;
  const city = await City.findByPk(id);
  if (city) {
    const updatedCity = await city.update({
      ...req.body,
    });
    res.json(updatedCity);
  } else return next(new AppError('City not found', 404));
});

const toggleActive = catchAsync(async (req, res, next) => {
  const city = await City.findByPk(req.params.id);
  if (city) {
    await city.toggleActive();
    res.json({ message: 'City updated', city });
  } else {
    return next(new AppError('City not found', 404));
  }
});

export {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  toggleActive,
};
