import Country from '../../models/Country.js';
import catchAsync from '../../utils/catchAsync.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';
import createReport from '../../utils/report.js';
import City from '../../models/City.js';

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
    ...req.body,
  });
  await createReport(req, 'created new country named ' + country.name);
  res.json(country);
});

const updateCountry = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const country = await Country.findByPk(id);
  if (country) {
    // if (req.body.active) {
    //   delete req.body.active;
    // }
    const updatedCountry = await country.update({
      ...req.body,
    });
    // IF Country deactivated then deactivate all cities in it vise versa
    if (!updatedCountry.active) {
      await City.update({ active: 0 });
    } else {
      await City.update({ active: 1 });
    }
    await createReport(req, 'updated country named ' + updatedCountry.name);
    res.json(updatedCountry);
  } else return next(new AppError('Country not found', 404));
});

const toggleActive = catchAsync(async (req, res, next) => {
  const country = await Country.findByPk(req.params.id);
  if (country) {
    await country.toggleActive();
    if (country.active)
      await createReport(req, 'activated country named ' + country.name);
    else await createReport(req, 'deactivated country named ' + country.name);
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
