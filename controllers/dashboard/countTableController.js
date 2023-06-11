import Category from '../../models/Category.js';
import City from '../../models/City.js';
import Chat from '../../models/Chat.js';
import ContactUs from '../../models/ContactUs.js';
import Country from '../../models/Country.js';
import Customer from '../../models/Customer.js';
import Employee from '../../models/Employee.js';
// import EmployeeRole from '../../models/EmployeeRole.js';
import Notification from '../../models/Notification.js';
import Owner from '../../models/Owner.js';
import Permission from '../../models/Permission.js';
import Property from '../../models/Property.js';
import PropertyGeneralRequest from '../../models/PropertyGeneralRequest.js';
import PropertyImage from '../../models/PropertyImage.js';
import Report from '../../models/Report.js';
import PropertyRequest from '../../models/PropertyRequest.js';
import Role from '../../models/Role.js';
import RolePermission from '../../models/RolePermission.js';
import StaticPage from '../../models/StaticPage.js';

import catchAsync from '../../utils/catchAsync.js';
// import AppError from '../../utils/appError.js';
// import ApiFeatures from '../../utils/apiFeatures.js';

const getCountTable = catchAsync(async (req, res, next) => {
  const categoryCount = await Category.count();
  const cityCount = await City.count();
  const chatCount = await Chat.count();
  const contactUsCount = await ContactUs.count();
  const countryCount = await Country.count();
  const customerCount = await Customer.count();
  const employeeCount = await Employee.count();
  // const employeeRoleCount = await EmployeeRole.count();
  const notificationCount = await Notification.count();
  const ownerCount = await Owner.count();
  const permissionCount = await Permission.count();
  const propertyCount = await Property.count();
  const propertyGeneralRequestCount = await PropertyGeneralRequest.count();
  const propertyImageCount = await PropertyImage.count();
  const reportCount = await Report.count();
  const propertyRequestCount = await PropertyRequest.count();
  const roleCount = await Role.count();
  const rolePermissionCount = await RolePermission.count();
  const staticPageCount = await StaticPage.count();

  res.json({
    categoryCount,
    cityCount,
    chatCount,
    contactUsCount,
    countryCount,
    customerCount,
    employeeCount,
    // employeeRoleCount,
    notificationCount,
    ownerCount,
    permissionCount,
    propertyCount,
    propertyGeneralRequestCount,
    propertyImageCount,
    reportCount,
    propertyRequestCount,
    roleCount,
    rolePermissionCount,
    staticPageCount,
  });
});

export default getCountTable;
