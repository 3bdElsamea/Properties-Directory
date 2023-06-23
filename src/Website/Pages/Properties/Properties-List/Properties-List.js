import React, { useEffect, useState } from "react";
import PropertiesListFilter from "./Property-List-Filter";
import { Row, Col } from "reactstrap";
import { AxiosWeb } from "../../../../Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBath,
  faRulerCombined,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import "./Properties-List.css";
import Btn from "../../../../Dashboard/SharedUI/Btn/Btn";

const PropertiesList = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [cityName, setCityName] = useState([]);
  const [filteredPropertyList, setFilteredPropertyList] = useState([]);
  const [requestedProperties, setRequestedProperties] = useState([]);
  const [showNoProducts, setShowNoProducts] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getPropertyList();
    getRequestedProperties();
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token"); // Check for token in local storage
    setIsLoggedIn(!!token); // Update the login status based on token availability
  };

  const getPropertyList = async () => {
    try {
      const response = await AxiosWeb.get("/properties?title=");
      const properties = response.data.data;
      setPropertyList(properties);
      setFilteredPropertyList(properties);
      setShowNoProducts(properties.length === 0);
      // getCityNames(properties);
    } catch (error) {
      console.log(error);
    }
  };

  const getCityNames = async (properties) => {
    try {
      const cityNames = await Promise.all(
        properties.map(async (property) => {
          const response = await AxiosWeb.get(`/cities/${property.cityId}`);
          return response.data.name;
        })
      );
      setCityName(cityNames);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequestedProperties = async () => {
    try {
      const response = await AxiosWeb.get("/requests");
      const requestedPropertyIds = response.data.map(
        (request) => request.property_id
      );
      setRequestedProperties(requestedPropertyIds);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async (property_id) => {
    try {
      await AxiosWeb.post(`/requests/${property_id}`);
      // Handle success or show a message to the user
      console.log("Request submitted successfully!");
      setRequestedProperties((prevState) => [...prevState, property_id]);
    } catch (error) {
      console.log(error);
      // Handle error or show an error message to the user
    }
  };

  return (
    <div className="properties_container">
      <h3>Show All Properties</h3>
      <Row className="propertiesRow">
        <Col className="colNum1">
          <PropertiesListFilter
            setFilteredPropertyList={setFilteredPropertyList}
            filteredPropertyList={filteredPropertyList}
          />
        </Col>
        <Col>
          <div className="card-column">
            {showNoProducts ? (
              <div className="no-products-message">No products</div>
            ) : (
              filteredPropertyList.map((property, index) => (
                <div className="card propertyCard" key={property.id}>
                  <div className="cardImageContainer">
                    <img
                      src={property.image}
                      alt="Property"
                      width="100"
                      height="100"
                    />
                    <div className="cardImageText">${property.price} / mo</div>
                  </div>
                  <div className="cardContent">
                    <a href={`/PropertyDetails/${property.id}`}>{property.title}</a>
                    <small>In {cityName[index]}</small>
                    <span>
                      <FontAwesomeIcon icon={faBed} /> {property.bedrooms}{" "}
                      <span className="details">bed</span>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faBath} /> {property.bathrooms}{" "}
                      <span className="details">bath</span>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faRulerCombined} /> {property.area}{" "}
                      <span className="details">sqft</span>
                    </span>
                    <hr className="cardHr" />
                    <FontAwesomeIcon icon={faKey} />
                    <span className="mr-5">For Rent</span>
                    {requestedProperties.includes(property.id) ? (
                      <span className="requestedSpan">Already requested</span>
                    ) : isLoggedIn ? (
                      <Btn
                        onClick={() => handleRequest(property.id)}
                        title="Request"
                        className="btn updateBtn ud-btn btn-secondary mt-0 updateBtn fs-5"
                      />
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PropertiesList;
