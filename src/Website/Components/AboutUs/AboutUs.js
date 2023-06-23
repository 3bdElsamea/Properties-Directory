import img1 from '../../Assets/img/Home/living-room.jpg';
import apt1 from '../../Assets/img/Home/house1.jpg';
import apt2 from '../../Assets/img/Home/house2.jpg';
import apt3 from '../../Assets/img/Home/apt3.jpeg';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './AboutUs.css'
import { AxiosWeb,AxiosDashboard } from '../../../Axios';


const AboutUs = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await AxiosWeb.get('/data');
        setContactInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching contact information:', error);
      }
    };

    const fetchStatistics = async () => {
      try {
        const response = await AxiosDashboard.get('/statistic');
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchContactInfo();
    fetchStatistics();
  }, []);

  if (!contactInfo) {
    return <div>Loading...</div>;
  }
  // Filter the statistics array to include only the categories you want to display
  const filteredStatistics = statistics.filter(
    statistic =>
    statistic.name === 'Property' ||
      statistic.name === 'Employee' ||
      statistic.name === 'Customer' 
  );

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <h4 className="section-title fw-bold text-xl-start fs-1 text-uppercase" style={{ color: '#EB6753' }}>About Us</h4>
            <h2 className="mb-4 mt-4" style={{ color: '#0F172B' }}>Welcome to <span className="text-uppercase text-lg" style={{ color: '#EB6753' }}>Homez</span></h2>
            <p className="mb-4">{contactInfo.description}</p>
            <div className="row g-3 pb-4">
            {filteredStatistics.map((statistic, index) => (
                <div className="col-sm-4 wow fadeIn" data-wow-delay={`${0.1 * (index + 1)}s`} key={index}>
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4">
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
            
            <Link to="/about" className="btn btn py-3 px-5 mt-2" style={{ backgroundColor: '#19172F' ,color:'#ffff'}}>
              Explore More
            </Link>

          </div>

  
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6 text-end">
                <img className="img-fluid rounded w-100 mb-2 wow zoomIn" data-wow-delay="0.1s" src={apt1} alt="" style={{marginTop: '25%', visibility: 'visible', animationDelay: '0.1s', animationName: 'zoomIn'}} />
              </div>
              <div className="col-6 text-start">
                <img className="img-fluid rounded w-100 h-100 mb-4 wow zoomIn" data-wow-delay="0.3s" src={apt2} alt="" style={{visibility: 'visible', animationDelay: '0.3s', animationName: 'zoomIn'}} />
              </div>
              <div className="col-6 text-end">
                <img className="img-fluid rounded w-80 mt-4 wow zoomIn " data-wow-delay="0.5s" src={apt3} alt="" style={{visibility: 'visible', animationDelay: '0.5s', animationName: 'zoomIn'}} />
              </div>
              <div className="col-6 text-start">
                <img className="img-fluid rounded w-100 mt-4 wow zoomIn" data-wow-delay="0.7s" src={img1} alt="" style={{visibility: 'visible', animationDelay: '0.7s', animationName: 'zoomIn'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;