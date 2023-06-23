import React, { useEffect, useState } from "react";
import { AxiosWeb } from "../../../Axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Profile.css";
import Btn from "../../../Dashboard/SharedUI/Btn/Btn";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const [userData, setUserData] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showErrorvalidation, setErrorvalidation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

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
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email address"
      )
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^\d+$/, "Phone number must be numeric")
      .required("Phone number is required"),
    password: Yup.string().test(
      "password-strength",
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
      (value) => {
        // Apply regex validation
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_/#.%*?&])[A-Za-z\d@./_#$!%*?&]{8,}$/.test(
          value
        );
      }
    ),
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
        if (imageFile) {
          const allowedExtensions = /\.(jpeg|png|jpg)$/i;
          if (!allowedExtensions.test(imageFile.name)) {
            setShowErrorMessage(true);
            setErrorvalidation("Invalid file format. Only image files are allowed.");
            return; // Stop form submission
          }
          const formData = new FormData();
          formData.append("image", imageFile);
          const response = await AxiosWeb.patch("/auth/me", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          updatedValues.image = response.data.imageUrl;
        }
        const response = await AxiosWeb.patch("/auth/me", updatedValues);
        console.log("Updated profile data:", response.data);
        navigate("/profile");
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  return (
    <div className="col-xl-6 mt-5" style={{ marginLeft: "25%" }}>
      <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
        <div className="col-xl-10">
          <div className="profile-box position-relative d-md-flex align-items-end mb50">
            <div className="profile-img position-relative overflow-hidden bdrs12 mb20-sm">
              <img
                className="profileImg"
                src={
                  values?.image ||
                  "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                }
                alt="profile_image"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <h2 className="mb30">Update Profile</h2>
          
          <form onSubmit={handleSubmit} className="form-style1">
            <div className="row">
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label
                    className="heading-color ff-heading fw600 mb10"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    className="form-control"
                  />
                  {touched.username && errors.username && (
                    <div className="error text-danger">{errors.username}</div>
                  )}
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label
                    className="heading-color ff-heading fw600 mb10"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                  {touched.name && errors.name && (
                    <div className="error text-danger">{errors.name}</div>
                  )}
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label
                    className="heading-color ff-heading fw600 mb10"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                  {touched.email && errors.email && (
                    <div className="error text-danger">{errors.email}</div>
                  )}
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label
                    className="heading-color ff-heading fw600 mb10"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                  {touched.phone && errors.phone && (
                    <div className="error text-danger">{errors.phone}</div>
                  )}
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label
                    className="heading-color ff-heading fw600 mb10"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                  />
                  {touched.password && errors.password && (
                    <div className="error text-danger">{errors.password}</div>
                  )}
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label
                    className="heading-color ff-heading fw600 mb10"
                    htmlFor="image"
                  >
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                  />
                  {touched.image && errors.image && (
                    <div className="error text-danger">{errors.image}</div>
                  )}
                </div>
              </div>
              {showErrorMessage && (
            <div className="error-message text-danger">{showErrorvalidation}</div>
          )}
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
