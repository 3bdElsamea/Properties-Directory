import React, { useEffect, useState } from "react";
import {AxiosWeb} from "../../../../Axios";
import "./AboutUs.css";

const AboutSection = () => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await AxiosWeb.get("/data");
      setDescription(response.data.data.description);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="about-section">
      <div className="background-image">
        <h1>About Us</h1>
      </div>
      <div className="content">
        <div className="left-section">
          <h1>
            We're on a Mission to Change
            <br />
            View of Real Estate Field.
          </h1>
        </div>
        <div className="right-section">
          <p>
            {description.split('Whether')[0]}
          </p><br/>
          <p>
            {description.split('Whether')[1]}
          </p>
        </div>
      </div>
      <img
        src="https://creativelayers.net/themes/homez-html/images/about/about-page-banner.jpg"
        alt="real estate"
        className="realEstateImg"
      />
      <div className="row rowAbout">
        <div className="column columnAbout">
          <h1>4M</h1>
          <h6>Award Winning</h6>
        </div>
        <div className="column columnAbout">
          <h1>12K</h1>
          <h6>Property Ready</h6>
        </div>
        <div className="column columnAbout">
          <h1>20M</h1>
          <h6>Happy Customers</h6>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
