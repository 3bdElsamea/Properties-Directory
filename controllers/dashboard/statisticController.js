import catchAsync from '../../utils/catchAsync.js';

import Category from '../../models/Category.js';
import City from '../../models/City.js';
import ContactUs from '../../models/ContactUs.js';
import Country from '../../models/Country.js';
import Customer from '../../models/Customer.js';
import Employee from '../../models/Employee.js';
import Owner from '../../models/Owner.js';
import Property from '../../models/Property.js';
import PropertyGeneralRequest from '../../models/PropertyGeneralRequest.js';
import PropertyRequest from '../../models/PropertyRequest.js';
import StaticPage from '../../models/StaticPage.js';

const getStatistic = catchAsync(async (req, res, next) => {
  const categoryCount = await Category.count();
  const cityCount = await City.count();
  const contactUsCount = await ContactUs.count();
  const countryCount = await Country.count();
  const customerCount = await Customer.count();
  const employeeCount = await Employee.count();
  const ownerCount = await Owner.count();
  const propertyCount = await Property.count();
  const activePropertyCount = await Property.count({
    where: {
      status: 'active',
    },
  });
  const inactivePropertyCount = await Property.count({
    where: {
      status: 'inactive',
    },
  });
  const propertyGeneralRequestCount = await PropertyGeneralRequest.count();
  const propertyRequestCount = await PropertyRequest.count();
  const pendingPropertyRequestCount = await PropertyRequest.count({
    where: {
      status: 'pending',
    },
  });
  const approvedPropertyRequestCount = await PropertyRequest.count({
    where: {
      status: 'active',
    },
  });
  const rejectedPropertyRequestCount = await PropertyRequest.count({
    where: {
      status: 'rejected',
    },
  });
  const staticPageCount = await StaticPage.count();
  res.json([
    {
      name: 'Category',
      count: categoryCount,
    },
    {
      name: 'City',
      count: cityCount,
    },
    {
      name: 'ContactUs',
      count: contactUsCount,
    },
    {
      name: 'Country',
      count: countryCount,
    },
    {
      name: 'Customer',
      count: customerCount,
    },
    {
      name: 'Employee',
      count: employeeCount,
    },
    {
      name: 'Owner',
      count: ownerCount,
    },
    {
      name: 'Property',
      count: propertyCount,
    },
    {
      name: 'Active Property',
      count: activePropertyCount,
    },
    {
      name: 'Inactive Property',
      count: inactivePropertyCount,
    },
    {
      name: 'Property General Request',
      count: propertyGeneralRequestCount,
    },
    {
      name: 'Property Request',
      count: propertyRequestCount,
    },
    {
      name: 'Pending Property Request',
      count: pendingPropertyRequestCount,
    },
    {
      name: 'Approved Property Request',
      count: approvedPropertyRequestCount,
    },
    {
      name: 'Rejected Property Request',
      count: rejectedPropertyRequestCount,
    },
    {
      name: 'Static Page',
      count: staticPageCount,
    },
  ]);
});

export default getStatistic;
