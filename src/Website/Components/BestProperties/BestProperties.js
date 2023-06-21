import React, { useState, useEffect } from 'react';
import { AxiosWeb } from '../../../Axios';
import './BestProperties.css';

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
    <div className='best'>
      <h1>Find Best Rated Properties</h1>
      <div>
        <p><span className='bold'>All</span></p>
        <p>Commercial</p>
        <p>Residential</p>
        <p>Agricultural</p>
      </div>
      <div className='container'>
        <div className='row'>
          {properties.map(property => (
            <div className='col-md-4' key={property.id}>
              <div className='property'>
                <img src={property.image} alt='' />
                <div className='property-details'>
                  <h3>Title: {property.title}</h3>
                  <p>Price: {property.price}$</p>
                </div>
              </div>
            </div>
          ))}
          <div className='col-md-4'>
            <div className='cardd card-3'>
            <span>View All Properties</span>
          <i className='fas fa-arrow-right'></i>            </div>
          </div>
        </div>
      </div>
      <div className='view-all'>
        <a href='/properties'>
          <span>View All Properties</span>
          <i className='fas fa-arrow-right'></i>
        </a>
      </div>
    </div>
  );
};

export default BestProperties;