
import Index from "./Dashboard/Pages/HomePage/Index.js";
import Profile from "./Dashboard/Pages/Profile/Profile.js";
import Login from "./Dashboard/Pages/Login/Login.js";
import Requests from "./Dashboard/Pages/Requests/Requests.js";
import Properties from './Dashboard/Pages/Properties/Properties.js';
import Categories from './Dashboard/Pages/Categories/Categories.js';
import Roles from './Dashboard/Pages/Roles/Roles.js';
import Setting from './Dashboard/Pages/Setting/Setting.js';
import Customers from './Dashboard/Pages/Customers/Customers.js';
import Employees from './Dashboard/Pages/Employees/Employees.js';
import Locations from './Dashboard/Pages/Locations/Locations.js';
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
    icon: "ni ni-bullet-list-67 text-blue",
    component: <Locations />,
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
    name: "Properties",
    icon: "ni ni-bag-17 text-blue",
    component: <PropertyAdd />,
    layout: "/admin",
  },
  {
    path: "/properties/update/:propertyId",
    name: "Properties",
    icon: "ni ni-bag-17 text-blue",
    component: <PropertyUpdate />,
    layout: "/admin",
  },
  {
    path: "/properties/details/:propertyId",
    name: "Properties",
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
    path: "/customers",
    name: "Customers",
    icon: "fa fa-users text-blue",
    component: <Customers />,
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
    path: "/roles",
    name: "Roles",
    icon: "fa fa-unlock text-blue",
    component: <Roles />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  
];
export default routes;
