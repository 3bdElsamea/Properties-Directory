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

  useEffect(() => {
    getPropertyList();
    getRequestedProperties();
  }, []);

  const getPropertyList = async () => {
    try {
      const response = await AxiosWeb.get("/properties?title=");
      setPropertyList(response.data.data);
      setFilteredPropertyList(response.data.data);
      getCityNames(response.data.data);
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
            {filteredPropertyList.length > 0 ? (
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
                    <a href={`/properties/${property.id}`}>{property.title}</a>
                    <small>In {cityName[index]}</small>
                    <span>
                      <FontAwesomeIcon icon={faBed} /> {property.bedrooms} <span className="details">bed</span>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faBath} /> {property.bathrooms} <span className="details">bath</span>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faRulerCombined} /> {property.area} <span className="details">sqft</span>
                    </span>
                    <hr className="cardHr" />
                    <FontAwesomeIcon icon={faKey} />
                    <span className="mr-5">For Rent</span>
                    {requestedProperties.includes(property.id) ? (
                      <span className="requestedSpan">Already requested</span>
                    ) : (
                      <Btn
                        onClick={() => handleRequest(property.id)}
                        title="Request"
                        className="btn updateBtn ud-btn btn-secondary updateBtn fs-5"
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              propertyList.map((property, index) => (
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
                    <a href={`/properties/${property.id}`}>{property.title}</a>
                    <small>In {cityName[index]}</small>
                    <span>
                      <FontAwesomeIcon icon={faBed} /> {property.bedrooms} <span className="details">bed</span>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faBath} /> {property.bathrooms} <span className="details">bath</span>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faRulerCombined} /> {property.area} <span className="details">sqft</span>
                    </span>
                    <hr className="cardHr" />
                    <FontAwesomeIcon icon={faKey} />
                    <span>For Rent</span>
                    {requestedProperties.includes(property.id) ? (
                      <span className="requestedSpan">Already requested</span>
                      ) : (
                      <Btn
                        onClick={() => handleRequest(property.id)}
                        title="Request"
                        className="btn btn-primary updateBtn ud-btn btn-white updateBtn fs-5"
                      />
                    )}
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
