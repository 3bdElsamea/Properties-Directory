import City from '../../models/City.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import catchAsync from '../../utils/catchAsync.js';

//get all active cities
const getAllActiveCities = catchAsync(async (req, res, next) => {
  req.query.active = 1;
  const cities = await new ApiFeatures(City, req.query).get();
  res.json(cities);
});

export default getAllActiveCities;
