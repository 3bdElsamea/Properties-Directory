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
import Locations from "./Dashboard/Pages/Locations/Locations.js";
import CreateLocation from "./Dashboard/Pages/Locations/CreateLocation.js";
import Owners from './Dashboard/Pages/Owners/Owners.js';
import OwnerUpdate from './Dashboard/Pages/Owners/OwnerUpdate.js';
import OwnerAdd from './Dashboard/Pages/Owners/OwnerAdd.js';
import CategoriesUpdate from "./Dashboard/Pages/Categories/CategoriesUpdate.js"
import CategoriesAdd from "./Dashboard/Pages/Categories/CategoriesAdd.js"
// import ErrorPage from "./Dashboard/Pages/ErrorPage/ErrorPage.js"
import PropertyAdd from "./Dashboard//Pages/Properties/PropertyAdd.js"
import PropertyUpdate from "./Dashboard/Pages/Properties/PropertyUpdate.js"
import PropertyDetails from "./Dashboard/Pages/Properties/PropertyDetails.js"
import OwnerDetails from './Dashboard/Pages/Owners/OwnerDetails.js';
var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/setting",
    name: "Setting",
    icon: "fa fa-gear text-blue",
    component: <Setting />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/requests",
    name: "Requests",
    icon: "fa fa-shopping-basket text-blue",
    component: <Requests />,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <Categories />,
    layout: "/admin",
  },
  {
    path: "/categories/Update/:CategoryId",
    name: "CategoriesUpdate",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <CategoriesUpdate />,
    layout: "/admin",
  },
  {
    path: "/categories/Add",
    name: "CategoriesAdd",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <CategoriesAdd/>,
    layout: "/admin",
  },
  {
    path: "/locations",
    name: "Locations",
    icon: "ni ni-pin-3 text-blue",
    component: <Locations />,
    layout: "/admin",
  },
  {
    path: "/locations/create",
    name: "Create Locations",
    component: <CreateLocation />,
    layout: "/admin",
  },
  {
    path: "/properties",
    name: "Properties",
    icon: "ni ni-bag-17 text-blue",
    component: <Properties />,
    layout: "/admin",
  },
  {
    path: "/properties/add",
    name: "Add Properties",
    icon: "ni ni-bag-17 text-blue",
    component: <PropertyAdd />,
    layout: "/admin",
  },
  {
    path: "/properties/update/:propertyId",
    name: "Update Properties",
    icon: "ni ni-bag-17 text-blue",
    component: <PropertyUpdate />,
    layout: "/admin",
  },
  {
    path: "/properties/details/:propertyId",
    name: "Details Properties",
    icon: "ni ni-bag-17 text-blue",
    component: <PropertyDetails />,
    layout: "/admin",
  },
  {
    path: "/Owners",
    name: "Owners",
    icon: "fa fa-users text-blue",
    component: <Owners />,
    layout: "/admin",
  },
  {
    path: "/Owners/Update/:ownerId",
    name: "Update Owners",
    component: <OwnerUpdate />,
    layout: "/admin",
  },
  {
    path: "/Owners/Add",
    name: "Add Owners",
    component: <OwnerAdd />,
    layout: "/admin",
  },
  {
    path: "/Owners/Details/:ownerId",
    name: "Details Owners",
    component: <OwnerDetails />,
    layout: "/admin",
  },
  {
    path: "/customers",
    name: "Customers",
    icon: "fa fa-users text-blue",
    component: <Customers />,
    layout: "/admin",
  },
  {
    path: "/customers/details/:id",
    name: "Customer Details",
    component: <CustomerDetails />,
    layout: "/admin",
  },

  
  {
    path: "/employees",
    name: "Employees",
    icon: "fa fa-users text-blue",
    component: <Employees />,
    layout: "/admin",
  },
  {
    //create-employee
    path: "/create-employee",
    name: "Create Employee",
    component: <CreateEmployee />,
    layout: "/admin",
  },
  {
    //update-employee
    path: "/update-employee/:id",
    name: "Update Employee",
    component: <UpdateEmployee />,
    layout: "/admin",
  },

  {
    path: "/employees/details/:id",
    name: "Employee Details",
    component: <EmployeeDetails />,
    layout: "/admin",

  },

  {
    path: "/roles",
    name: "Roles",
    icon: "fa fa-unlock text-blue",
    component: <Roles />,
    layout: "/admin",
  },
  {
    path: "/roles/create",
    name: "Create Roles",
    icon: "fa fa-unlock text-blue",
    component: <RolesCreate />,
    layout: "/admin",
  },
  {
    path: "/roles/update/:id",
    name: "Update Roles",
    icon: "fa fa-unlock text-blue",
    component: <RolesUpdate />,
    layout: "/admin",
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
    path: "/locations",
    name: "Locations",
    icon: "ni ni-pin-3 text-blue",
    component: <Locations />,
    layout: "/admin",
  },
  {
    path: "/locations/create",
    name: "Create Locations",
    component: <CreateLocation />,
    layout: "/admin",
  },
  {
    path: "/customers",
    name: "Customers",
    icon: "fa fa-users text-blue",
    component: <Customers />,
    layout: "/admin",
  },
  {
    path: "/customers/details/:id",
    name: "Customer Details",
    component: <CustomerDetails />,
    layout: "/admin",
  },

  
  {
    path: "/employees",
    name: "Employees",
    icon: "fa fa-users text-blue",
    component: <Employees />,
    layout: "/admin",
  },
  {
    //create-employee
    path: "/create-employee",
    name: "Create Employee",
    component: <CreateEmployee />,
    layout: "/admin",
  },
  {
    //update-employee
    path: "/update-employee/:id",
    name: "Update Employee",
    component: <UpdateEmployee />,
    layout: "/admin",
  },

  {
    path: "/employees/details/:id",
    name: "Employee Details",
    component: <EmployeeDetails />,
    layout: "/admin",

  },
 
];

export default routes;