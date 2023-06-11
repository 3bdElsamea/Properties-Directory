import React from "react";
import Index from "./Dashboard/Pages/HomePage/Index.js";
import Profile from "./Dashboard/Pages/Profile/Profile.js";
import Login from "./Dashboard/Pages/Login/Login.js";
import ForgetPassword from "./Dashboard/Pages/ForgetPassword/ForgetPassword.js";
import ResetPassword from "./Dashboard/Pages/ResetPassword/ResetPassword.js";
import Requests from "./Dashboard/Pages/Requests/Requests.js";
import Properties from "./Dashboard/Pages/Properties/Properties.js";
import Categories from "./Dashboard/Pages/Categories/Categories.js";
import Roles from "./Dashboard/Pages/Roles/Roles-List/Roles-List.js";
import RolesCreate from "./Dashboard/Pages/Roles/Roles-Create/Roles-Create.js";
import RolesUpdate from "./Dashboard/Pages/Roles/Roles-Update/Roles-Update.js";
import Setting from "./Dashboard/Pages/Setting/Setting.js";
import Customers from "./Dashboard/Pages/Customers/Customers.js";
import CustomerDetails from "Dashboard/Pages/Customers/CustomerDetails.js";
import Employees from "./Dashboard/Pages/Employees/Employees.js";
import CreateEmployee from "./Dashboard/Pages/Employees/CreateEmployee.js";
import UpdateEmployee from "./Dashboard/Pages/Employees/UpdateEmployee.js";
import EmployeeDetails from "./Dashboard/Pages/Employees/EmployeeDetails.js";
import Country from "./Dashboard/Pages/Country/Country.js";
import CreateCountry from "./Dashboard/Pages/Country/CreateCountry.js";
import Cities from "./Dashboard/Pages/Cities/Cities.js";
import CreateCity from "./Dashboard/Pages/Cities/CreateCity.js";
import Owners from "./Dashboard/Pages/Owners/Owners.js";
import OwnerUpdate from "./Dashboard/Pages/Owners/OwnerUpdate.js";
import OwnerAdd from "./Dashboard/Pages/Owners/OwnerAdd.js";
import CategoriesUpdate from "./Dashboard/Pages/Categories/CategoriesUpdate.js";
import CategoriesAdd from "./Dashboard/Pages/Categories/CategoriesAdd.js";
// import ErrorPage from "./Dashboard/Pages/ErrorPage/ErrorPage.js"
import PropertyAdd from "./Dashboard//Pages/Properties/PropertyAdd.js"
import PropertyUpdate from "./Dashboard/Pages/Properties/PropertyUpdate.js"
import PropertyDetails from "./Dashboard/Pages/Properties/PropertyDetails.js"
import OwnerDetails from './Dashboard/Pages/Owners/OwnerDetails.js';
import PropertyImages from './Dashboard/Pages/Properties/propertyImages.js'
var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/dashboard",
  },
  {
    path: "/setting",
    name: "Setting",
    icon: "fa fa-gear text-blue",
    component: <Setting />,
    layout: "/dashboard",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/dashboard",
  },
  {
    path: "/requests",
    name: "Requests",
    icon: "fa fa-shopping-basket text-blue",
    component: <Requests />,
    layout: "/dashboard",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <Categories />,
    layout: "/dashboard",
  },
  {
    path: "/categories/Update/:CategoryId",
    name: "CategoriesUpdate",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <CategoriesUpdate />,
    layout: "/dashboard",
  },
  {
    path: "/categories/Add",
    name: "CategoriesAdd",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <CategoriesAdd />,
    layout: "/dashboard",
  },

  {
    path: "/properties",
    name: "Properties",
    icon: "ni ni-bag-17 text-blue",
    component: <Properties />,
    layout: "/dashboard",
  },
  {
    path: "/properties/add",
    name: "Add Properties",
    icon: "ni ni-bag-17 text-blue",
    component: <PropertyAdd />,
    layout: "/dashboard",
  },
  {
    path: "/properties/update/:propertyId",
    name: "Update Properties",
    icon: "ni ni-bag-17 text-blue",
    component: <PropertyUpdate />,
    layout: "/dashboard",
  },
  {
    path: "/property-images/:propertyId",
    name: "propertyImages",
    icon: "ni ni-bag-17 text-blue",
    component: <PropertyImages />,
    layout: "/dashboard",
  },
  {
    path: "/properties/details/:propertyId",
    name: "Details Properties",
    icon: "ni ni-bag-17 text-blue",
    component: <PropertyDetails />,
    layout: "/dashboard",
  },
  {
    path: "/Owners",
    name: "Owners",
    icon: "fa fa-users text-blue",
    component: <Owners />,
    layout: "/dashboard",
  },
  {
    path: "/Owners/Update/:ownerId",
    name: "Update Owners",
    component: <OwnerUpdate />,
    layout: "/dashboard",
  },
  {
    path: "/Owners/Add",
    name: "Add Owners",
    component: <OwnerAdd />,
    layout: "/dashboard",
  },
  {
    path: "/Owners/Details/:ownerId",
    name: "Details Owners",
    component: <OwnerDetails />,
    layout: "/dashboard",
  },
  {
    path: "/customers",
    name: "Customers",
    icon: "fa fa-users text-blue",
    component: <Customers />,
    layout: "/dashboard",
  },
  {
    path: "/customers/details/:id",
    name: "Customer Details",
    component: <CustomerDetails />,
    layout: "/dashboard",
  },

  {
    path: "/employees",
    name: "Employees",
    icon: "fa fa-users text-blue",
    component: <Employees />,
    layout: "/dashboard",
  },
  {
    //create-employee
    path: "/create-employee",
    name: "Create Employee",
    component: <CreateEmployee />,
    layout: "/dashboard",
  },
  {
    //update-employee
    path: "/update-employee/:id",
    name: "Update Employee",
    component: <UpdateEmployee />,
    layout: "/dashboard",
  },

  {
    path: "/employees/details/:id",
    name: "Employee Details",
    component: <EmployeeDetails />,
    layout: "/dashboard",
  },

  {
    path: "/roles",
    name: "Roles",
    icon: "fa fa-unlock text-blue",
    component: <Roles />,
    layout: "/dashboard",
  },
  {
    path: "/roles/create",
    name: "Create Roles",
    icon: "fa fa-unlock text-blue",
    component: <RolesCreate />,
    layout: "/dashboard",
  },
  {
    path: "/roles/update/:id",
    name: "Update Roles",
    icon: "fa fa-unlock text-blue",
    component: <RolesUpdate />,
    layout: "/dashboard",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/forget-password",
    name: "Forget Password",
    icon: "ni ni-key-25 text-info",
    component: <ForgetPassword />,
    layout: "/auth",
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    icon: "ni ni-key-25 text-info",
    component: <ResetPassword />,
    layout: "/auth",
  },
  {
    path: "/countries",
    name: "Country",
    icon: "ni ni-pin-3 text-blue",
    component: <Country />,
    layout: "/dashboard",
  },
  {
    path: "/country/create",
    name: "Create Country",
    component: <CreateCountry />,
    layout: "/dashboard",
  },
  {
    path: "/city",
    name: "City",
    icon: "ni ni-pin-3 text-blue",
    component: <Cities />,
    layout: "/dashboard",
  },
  {
    path: "/city/create",
    name: "Create City",
    component: <CreateCity />,
    layout: "/dashboard",
  },
  {
    path: "/customers",
    name: "Customers",
    icon: "fa fa-users text-blue",
    component: <Customers />,
    layout: "/dashboard",
  },
  {
    path: "/customers/details/:id",
    name: "Customer Details",
    component: <CustomerDetails />,
    layout: "/dashboard",
  },

  {
    path: "/employees",
    name: "Employees",
    icon: "fa fa-users text-blue",
    component: <Employees />,
    layout: "/dashboard",
  },
  {
    //create-employee
    path: "/create-employee",
    name: "Create Employee",
    component: <CreateEmployee />,
    layout: "/dashboard",
  },
  {
    //update-employee
    path: "/update-employee/:id",
    name: "Update Employee",
    component: <UpdateEmployee />,
    layout: "/dashboard",
  },

  {
    path: "/employees/details/:id",
    name: "Employee Details",
    component: <EmployeeDetails />,
    layout: "/dashboard",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <Categories />,
    layout: "/dashboard",
  },
  {
    path: "/categories/Update/:CategoryId",
    name: "CategoriesUpdate",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <CategoriesUpdate />,
    layout: "/dashboard",
  },
  {
    path: "/categories/Add",
    name: "CategoriesAdd",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <CategoriesAdd />,
    layout: "/dashboard",
  },
  // {
  //   path: "/properties",
  //   name: "Properties",
  //   icon: "ni ni-bag-17 text-blue",
  //   component: <Properties />,
  //   layout: "/dashboard",
  // },
  // {
  //   path: "/properties/add",
  //   name: "Properties",
  //   icon: "ni ni-bag-17 text-blue",
  //   component: <PropertyAdd />,
  //   layout: "/dashboard",
  // },
  // {
  //   path: "/properties/update/:propertyId",
  //   name: "Properties",
  //   icon: "ni ni-bag-17 text-blue",
  //   component: <PropertyUpdate />,
  //   layout: "/dashboard",
  // },
  // {
  //   path: "/properties/details/:propertyId",
  //   name: "Properties",
  //   icon: "ni ni-bag-17 text-blue",
  //   component: <PropertyDetails />,
  //   layout: "/dashboard",
  // },
  

 
];

export default routes;
