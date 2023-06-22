import React, { useEffect, useState } from "react";
import { AxiosWeb } from "../../../Axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Profile.css";
import Btn from "../../../Dashboard/SharedUI/Btn/Btn";

const ProfileForm = () => {
  const [userData, setUserData] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showErrorvalidation, setErrorvalidation] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AxiosWeb.get("/auth/me");
        const oldData = response.data.customer;
        formik.setValues(oldData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone number must be numeric")
      .required("Phone number is required"),
      password: Yup.string().test(
        "password-strength",
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
        (value) => {
            // Apply regex validation
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_/#.%*?&])[A-Za-z\d@./_#$!%*?&]{8,}$/.test(value);
          }
      )
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema,
    
    onSubmit: async (values) => {
      const updatedValues = {
        username: values.username,
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password || userData.password,
      };
      try {
        
        const response = await AxiosWeb.patch("/auth/me", updatedValues);
        console.log("Updated profile data:", response.data);
        window.location.href = "/profile";
      } catch (error) {
        if (error.response && error.response.status === 500) {
          console.log(error.response.data.error.errors[0].message);
        }
        setShowErrorMessage(true);
        setErrorvalidation(error.response.data.error.errors[0].message);
        console.log("Error: " + error);
      }
    },
  });

  const { values, touched, errors, handleChange, handleSubmit } = formik;

  return (
    <div className="col-xl-6 mt-5" style={{ marginLeft: "25%" }}>
      <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
        <div className="col-xl-10">
          <div className="profile-box position-relative d-md-flex align-items-end mb50">
            <div className="profile-img position-relative overflow-hidden bdrs12 mb20-sm">
              <img
                className="profileImg"
                src={
                  userData?.image ||
                  "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                }
                alt="profile_image"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <h2 className="mb30">Update Profile</h2>
          <form onSubmit={formik.handleSubmit} className="form-style1">
            <div className="row">
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label
                    htmlFor="username"
                    className="heading-color ff-heading fw600 mb10"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={values.username}
                    onChange={handleChange}
                  />
                  {errors.username && touched.username && (
                    <span className="text-danger">{errors.username}</span>
                  )}
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label
                    htmlFor="name"
                    className="heading-color ff-heading fw600 mb10"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {errors.name && touched.name && (
                    <span className="text-danger">{errors.name}</span>
                  )}
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label
                    htmlFor="email"
                    className="heading-color ff-heading fw600 mb10"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label
                    htmlFor="phone"
                    className="heading-color ff-heading fw600 mb10"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={values.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && touched.phone && (
                    <span className="text-danger">{errors.phone}</span>
                  )}
                </div>
              </div>
              <div className="col-sm-12">
                <div className="mb20">
                  <label
                    htmlFor="password"
                    className="heading-color ff-heading fw600 mb10"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    //value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                </div>
              </div>
              
            </div>
            <Btn
              type="submit"
              title="Save Changes"
              className="btn btn-dark updateBtn ud-btn btn-white mb30 mt-4 updateBtn fs-5"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
