import React, { useEffect, useState } from "react";
import { AxiosWeb } from "../../../Axios";
import "./Profile.css";

function ProfileForm() {
  const [userData, setUserData] = useState(null);

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

  return (
    <div className="col-xl-12">
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
            <a href="update_profile" class="ud-btn btn-white mb30 updateBtn">
              Update Profile<i class="fa fa-arrow"></i>
            </a>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-style1">
            <div className="row">
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <p className="heading-color ff-heading fw600 mb10">
                    Username
                  </p>
                  <p className="form-control-static">
                    {userData?.username || "Loading..."}
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <p className="heading-color ff-heading fw600 mb10">Name</p>
                  <p className="form-control-static">
                    {userData?.name || "Loading..."}
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <p className="heading-color ff-heading fw600 mb10">Email</p>
                  <p className="form-control-static">
                    {userData?.email || "Loading..."}
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-xl-6">
                <div className="mb20">
                  <p className="heading-color ff-heading fw600 mb10">Phone</p>
                  <p className="form-control-static">
                    {userData?.phone || "Loading..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
