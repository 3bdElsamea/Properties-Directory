import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./Dashboard/Assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Dashboard/Assets/scss/argon-dashboard-react.scss";
import AdminLayout from "./Dashboard/Layouts/Admin.js";
import AuthLayout from "./Dashboard/Layouts/Auth.js";
import Home from "./Website/Pages/Home/Home";
import PropertiesList from "./Website/Pages/Properties/Properties-List/Properties-List";
import About from "./Website/Pages/Page/AboutUs/AboutUs"
import Navbar from "./Website/Components/Navbar/Navbar";
import Footer from "./Website/Components/Footer/Footer"
import LoginWebsite from "./Website/Pages/Login/Login";
import Profile from "./Website/Pages/Profile/Profile";
import UpdateProfile from "./Website/Pages/Profile/UpdateProfile";
import Register from "./Website/Pages/Register/Register";
import ResetPassword from "./Website/Pages/ResetPassword/ResetPassword";
import ContactUs from "./Website/Pages/ContactUs/ContactUs";
import MyRequests from "./Website/Pages/MyRequests/MyRequests";
import ErrorPage from "./Dashboard/Pages/ErrorPage/ErrorPage";
import PropertyDetails from "./Website/Pages/PropertyDetails/PropertyDetails"
import PropertiesSellList from "./Website/Pages/PropertiesSell/PropertiesSellList"
import PropertiesRentList from "./Website/Pages/PropertiesRent/PropertiesRentList"
import ResetPasswordDash from "./Dashboard/Pages/ResetPassword/ResetPassword";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'typeface-poppins';
import './app.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
const jwt = localStorage.getItem("jwt");

root.render(
  <BrowserRouter>
    <Routes>
    {!jwt && !<Route path="/auth/reset-password" element={<ResetPasswordDash />} />
    && <Route path="/*" element={<Navigate to="/auth/login" replace />} />}
      <Route path="/dashboard/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/home" element={<><Navbar/><Home /> <Footer/> </>} />
      <Route path="/properties" element={<><Navbar/> <PropertiesList /><Footer/></>} />
      <Route path="/properties/sell" element={<><Navbar/> <PropertiesSellList /><Footer/></>} />
      <Route path="/properties/rent" element={<><Navbar/> <PropertiesRentList /><Footer/></>} />

      <Route path="/about" element={<><Navbar/> <About /><Footer/></>} />
      <Route path="/PropertyDetails/:propertyId" element={<><Navbar/><PropertyDetails /><Footer/></>} />
      <Route path="/register" element={<><Register /></>} />
      <Route path="/login" element={<><LoginWebsite /></>} />
      <Route path="/profile" element={<><Navbar/><Profile /><Footer/></>} />
      <Route path="/update_profile" element={<><Navbar/><UpdateProfile /><Footer/></>} />
      <Route path="/auth/reset-password/:id" element={<><ResetPassword /></>} />
      <Route path="/my-requests" element={<><Navbar/><MyRequests /><Footer/></>} />
      <Route path="/contact-us" element={<><Navbar/><ContactUs /><Footer/></>} />
      <Route path="*" element={<ErrorPage />} />
      {/* <Route path="*" element={<Navigate to="/admin/index" replace />} /> */}
    </Routes>
  </BrowserRouter>
);
