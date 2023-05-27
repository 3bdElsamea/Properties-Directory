
import Index from "./Dashboard/Pages/HomePage/Index.js";
import Profile from "./Dashboard/Pages/Profile/Profile.js";
import Login from "./Dashboard/Pages/Login/Login.js";
import Requests from "./Dashboard/Pages/Requests/Requests.js";
import Properties from './Dashboard/Pages/Properties/Property-list/Properties.js';
import Categories from './Dashboard/Pages/Categories/Categories.js';
import Roles from './Dashboard/Pages/Roles/Roles.js';
import Setting from './Dashboard/Pages/Setting/Setting.js';
import Customers from './Dashboard/Pages/Customers/Customers.js';
import Employees from './Dashboard/Pages/Employees/Employees.js';
import Locations from './Dashboard/Pages/Locations/Locations.js';

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
  }
];
export default routes;
