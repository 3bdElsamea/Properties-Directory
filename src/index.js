import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./Dashboard/Assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Dashboard/Assets/scss/argon-dashboard-react.scss";
import  ErrorPage from "./Dashboard/Pages/ErrorPage/ErrorPage";
import AdminLayout from "./Dashboard/Layouts/Admin.js";
import AuthLayout from "./Dashboard/Layouts/Auth.js";
import Home from "./Website/Pages/Home/Home";
import LoginWebsite from "./Website/Pages/Login/Login";
import ResetPassword from "./Website/Pages/ResetPassword/ResetPassword";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
const jwt = localStorage.getItem("jwt");

root.render(
  <BrowserRouter>
    <Routes>
      {!jwt && <Route path="/dashboard/*" element={<Navigate to="/auth/login" replace />} />}
      <Route path="/dashboard/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/login" element={<LoginWebsite />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/error" element={<ErrorPage />} />
     {/*<Route path="*" element={<Navigate to="/error" replace />} />*/}
      <Route path="*" element={<Navigate to="/dashboard/index" replace />} />
    </Routes>
  </BrowserRouter>
);
