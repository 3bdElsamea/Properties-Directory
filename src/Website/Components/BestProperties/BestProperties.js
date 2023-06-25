import React, { useState, useEffect } from 'react';
import { AxiosWeb } from '../../../Axios';
import './BestProperties.css';
import { Helmet } from 'react-helmet';


const BestProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    AxiosWeb.get('/properties/last-five-properties')
      .then(response => {
        setProperties(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
  
    <div className='best my-6'>
       <Helmet>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet" />
      </Helmet>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h4 className="section-title text-center text-uppercase fs-1  fw-bold" style={{ color: '#EB6753' }}>Our Properties</h4>
            <h1 className="mb-4 p-3">Explore Our <span className="text-uppercase" style={{ color: '#EB6753' }}>Properties</span></h1>
          </div>
          <div className="row g-4 ">
            {properties.map(property => (
              <div className="col-lg-4 col-md-6 mb-4 cardImage wow fadeInUp" data-wow-delay="0.1s" key={property.id}>
                <div className="room-item shadow rounded overflow-hidden">
                  <div className="position-relative cardImage">
                    <img className="img-fluid w-100 h-100" src={property.image} alt="" />
                    {/* <small className="position-absolute start-0 top-100 translate-middle-y  text-white rounded py-1 px-3 ms-4" style={{ backgroundColor: '#EB6753' }}>d;,d;,;c</small> */}
                  </div>
                  <div className="p-4 mt-2">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">{property.title}</h5>
                    
                    </div>
                    <div className="d-flex mb-3">
                      <small className="border-end m-2 "><i className="fa fa-bed  m-1"  style={{ color: '#EB6753' }}></i> Bedrooms: {property.bedrooms}</small>
                      <small className="border-end m-2 "><i className="fa fa-bath  me-1"  style={{ color: '#EB6753' }}></i> Bathrooms: {property.bathrooms}</small>
                    </div>
                    <p className="text-body">{property.description.length > 50 ? property.description.slice(0, 50) + '...' : property.description}</p>
                    <div className="d-flex justify-content-between">
                    <a className="btn btn-sm btn rounded py-2 px-4" href={`/PropertyDetails/${property.id}`} style={{ color: '#ffff', backgroundColor:'#19172F' }}>View Detail</a>

                    </div>
                  </div>
                </div>
              </div>
            ))}
        <div className="col-lg-4 col-md-6 mb-4 wow fadeInUp">
        <div className="cardAll card_red text-center">
            <div className="title">
              <i className="fa fa-home" aria-hidden="true"></i>
              <h2>ALL Properties</h2>
            </div>
            
             <a href="/properties">Show All</a>

          </div>
  
      </div>
          </div>


        </div>
      </div>
     
    </div>
  );
};

export default BestProperties;
