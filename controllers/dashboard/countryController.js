import Country from '../../models/Country.js';
import catchAsync from '../../utils/catchAsync.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';
// import next from 'ajv/lib/vocabularies/next.js';

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
  const { name } = req.body;
  const country = await Country.create({
    name,
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

const deleteCountry = catchAsync(async (req, res) => {
  const country = await Country.findByPk(req.params.id);
  if (country) {
    await country.destroy();
    res.json({ message: 'Country removed' });
  } else {
    res.status(404).json({ error: 'Country not found' });
  }
});

// Toggle active
const toggleActive = catchAsync(async (req, res) => {
  const country = await Country.findByPk(req.params.id);
  if (country) {
    await country.toggleActive();
    res.json({ message: 'Country updated', country });
  } else {
    res.status(404).json({ error: 'Country not found' });
  }
});

export {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
  toggleActive,
};
