import Country from '../../models/Country.js';
import catchAsync from '../../utils/catchAsync.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';

const getAllCountries = catchAsync(async (req, res) => {
  const countries = await new ApiFeatures(Country, req.query).get();
  res.json(countries);
});

const getCountryById = catchAsync(async (req, res, next) => {
  const country = await Country.findByPk(req.params.id);
  if (!country) {
    return next(new AppError('Country not found', 404));
  }
  res.json(country);
});

const createCountry = catchAsync(async (req, res, next) => {
  const country = await Country.create({
    ...req.body
  });
  res.json(country);
});

const updateCountry = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const country = await Country.findByPk(id);
  if (country) {
    const updatedCountry = await country.update({
      ...req.body,
    });
    res.json(updatedCountry);
  } else return next(new AppError('Country not found', 404));
});

const toggleActive = catchAsync(async (req, res, next) => {
  const country = await Country.findByPk(req.params.id);
  if (country) {
    await country.toggleActive();
    res.json({ message: 'Country updated', country });
  } else {
    return next(new AppError('Country not found', 404));
  }
});

export {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  toggleActive,
};
