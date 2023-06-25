import React, { useEffect, useState } from "react";
import {AxiosWeb} from "../../../../Axios";
import {AxiosDashboard} from "../../../../Axios";

import "./AboutUs.css";

const AboutSection = () => {
  const [description, setDescription] = useState("");
  const [statistics, setStatistics] = useState([]);

  const fetchStatistics = async () => {
    try {
      const response = await AxiosDashboard.get('/statistic');
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchStatistics();
  }, []);

  const fetchData = async () => {
    try {
      const response = await AxiosWeb.get("/data");
      setDescription(response.data.data.description);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const filteredStatistics = statistics.filter(
    statistic =>
    statistic.name === 'Property' ||
      statistic.name === 'Employee' ||
      statistic.name === 'Customer' 
  );

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
      <div className="row g-3 pb-4">
            {filteredStatistics.map((statistic, index) => (
                <div className="col-sm-4 wow fadeIn" data-wow-delay={`${0.1 * (index + 1)}s`} key={index}>
                  <div className=" p-4">
                    <div className="  text-center p-4">
                      {statistic.name === 'Employee' && (
                        <i className="fa fa-users-cog fa-2x  mb-2" style={{ color: '#EB6753' }}></i>
                      )}
                      {statistic.name === 'Customer' && (
                        <i className="fa fa-users fa-2x  mb-2" style={{ color: '#EB6753' }}></i>
                      )}
                      {statistic.name === 'Property' && (
                        <i className="fa fa-hotel fa-2x mb-2" style={{ color: '#EB6753' }}></i>
                      )}
                      <h2 className="mb-1" data-toggle="counter-up">{statistic.count}</h2>
                      <p className="mb-0">{statistic.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      </div>
    </div>
  );
};

export default AboutSection;
