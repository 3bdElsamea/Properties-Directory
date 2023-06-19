import React from "react";
import "./AboutUs.css";
const AboutSection = () => {
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
            It doesn’t matter how organized you are — a surplus of toys will
            always ensure your house is a mess waiting to happen. Fortunately,
            getting kids on board with the idea of ditching their stuff is a lot
            easier than it sounds.
          </p>
          <p>
            Maecenas quis viverra metus, et efficitur ligula. Nam congue augue
            et ex congue, sed luctus lectus congue. Integer convallis
            condimentum sem. Duis elementum tortor eget condimentum tempor.
            Praesent sollicitudin lectus ut pharetra pulvinar.
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
