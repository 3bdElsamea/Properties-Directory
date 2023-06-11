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
    name: "hiddenRoute",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <CategoriesUpdate />,
    layout: "/dashboard",
  },
  {
    path: "/categories/Add",
    name: "hiddenRoute",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <CategoriesAdd/>,
    layout: "/dashboard",
  },
  {
    path: "/locations",
    name: "Locations",
    icon: "ni ni-pin-3 text-blue",
    component: <Locations />,
    layout: "/dashboard",
  },
  {
    path: "/locations/create",
    name: "hiddenRoute",
    component: <CreateLocation />,
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
    name: "hiddenRoute",
    icon: "ni ni-bag-17 text-blue",
    component: <PropertyAdd />,
    layout: "/dashboard",
  },
  {
    path: "/properties/update/:propertyId",
    name: "hiddenRoute",
    icon: "ni ni-bag-17 text-blue",
    component: <PropertyUpdate />,
    layout: "/dashboard",
  },
  {
    path: "/properties/details/:propertyId",
    name: "hiddenRoute",
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
    name: "hiddenRoute",
    component: <OwnerUpdate />,
    layout: "/dashboard",
  },
  {
    path: "/Owners/Add",
    name: "hiddenRoute",
    component: <OwnerAdd />,
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
    path: "/Customers/details/:id",
    name: "hiddenRoute",
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
    name: "hiddenRoute",
    component: <CreateEmployee />,
    layout: "/dashboard",
  },
  {
    //update-employee
    path: "/update-employee/:id",
    name: "hiddenRoute",
    component: <UpdateEmployee />,
    layout: "/dashboard",
  },

  {
    path: "/employees/details/:id",
    name: "hiddenRoute",
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
    name: "hiddenRoute",
    icon: "fa fa-unlock text-blue",
    component: <RolesCreate />,
    layout: "/dashboard",
  },
  {
    path: "/roles/:id",
    name: "hiddenRoute",
    icon: "fa fa-unlock text-blue",
    component: <RolesUpdate/>,
    layout: "/dashboard",
  },
  {
    path: "/login",
    name: "hiddenRoute",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/forget-password",
    name: "hiddenRoute",
    icon: "ni ni-key-25 text-info",
    component: <ForgetPassword />,
    layout: "/auth",
  },
  {
    path: "/reset-password/:id",
    name: "hiddenRoute",
    icon: "ni ni-key-25 text-info",
    component: <ResetPassword />,
    layout: "/auth",
  },
  
];

export default routes;