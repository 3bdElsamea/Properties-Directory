import React, { useState, useEffect } from 'react';
import "./Footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt,FaEnvelope,FaPhone } from 'react-icons/fa';
import { AxiosWeb } from '../../../Axios';

const Footer = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    AxiosWeb.get('/data')
      .then(response => {
        setContactInfo(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching contact information:', error);
      });
  }, []);

  if (!contactInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className='footerWeb'>
      <div className='social'>
        <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
          <FaFacebook className='icon fbIcon' />
        </a>
        <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
          <FaInstagram className='icon instaIcon' />
        </a>
        <a href={contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
          <FaTwitter className='icon twitterIcon' />
        </a>
        <a href={contactInfo.socialMedia.youtube} target="_blank" rel="noopener noreferrer">
          <FaYoutube className='icon youtubeIcon' />
        </a>
      </div>
      <div className='container'>
        <div className='col'>
          <h3>About</h3>
          <p>{contactInfo.description}</p>
          <p>{contactInfo.details}</p>
          <p>{contactInfo.planning}</p>
        </div>
        <div className='col ml-5' style={{ marginTop: '3%' }}>
          <h3>Links</h3>
          <a className='text-light' href='/about'>
            About Us
          </a>{' '}
          <br />
          <a className='text-light pb-2' href='/contact-us'>
            Contact Us
          </a>
        </div>
        <div className='col' style={{ marginTop: '3%' }}>
          <h3>Contact Us</h3>
          <p>
            <FaPhone /> {contactInfo.phone}
          </p>
          <p>
            <FaEnvelope /> {contactInfo.email}
          </p>
          <p>
            <FaMapMarkerAlt /> {contactInfo.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
