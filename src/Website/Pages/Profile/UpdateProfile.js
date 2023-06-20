import React, { useEffect, useState } from "react";
import { AxiosWeb } from "../../../Axios";
import "./Profile.css";
import Btn from '../../../Dashboard/SharedUI/Btn/Btn';

function ProfileForm() {
  const [userData, setUserData] = useState(null);
  const [updateData, setUpdateData] = useState({
    username: "",
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AxiosWeb.get("/auth/me");
        setUserData(response.data.customer);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setUpdateData({
        username: userData.username,
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosWeb.patch("/auth/me", updateData);
      console.log("Updated profile data:", response.data);
      window.location.href='/profile';
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  return (
    <div className="col-xl-6 mt-5" style={{marginLeft: '25%'}}>
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
            <a href="update_profile" className="ud-btn btn-white mb30 updateBtn fs-5" style={{fontSize:'14px'}}>
              Change Picture<i className="fa fa-arrow"></i>
            </a>
          </div>
        </div>
        <div className="col-lg-12">
          <h2 className="mb30">Update Profile</h2>
          <form onSubmit={handleUpdateProfile} className="form-style1">
            <div className="row">
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label htmlFor="username" className="heading-color ff-heading fw600 mb10">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={updateData.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label htmlFor="name" className="heading-color ff-heading fw600 mb10">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={updateData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label htmlFor="email" className="heading-color ff-heading fw600 mb10">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={updateData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <label htmlFor="phone" className="heading-color ff-heading fw600 mb10">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={updateData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <Btn type="submit" title="Save Changes" className="btn btn-dark updateBtn ud-btn btn-white mb30 mt-4 updateBtn fs-5"/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
