import React, { useEffect, useState } from "react";
import PropertiesListFilter from "../Properties/Properties-List/Property-List-Filter";
import { Row, Col } from "reactstrap";
import { AxiosWeb, AxiosDashboard } from "../../../Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBath,
  faRulerCombined,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import "./PropertiesRentList.css";
import Btn from "../../../Dashboard/SharedUI/Btn/Btn";

const PropertiesList = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [cityName, setCityName] = useState([]);
  const [filteredPropertyList, setFilteredPropertyList] = useState([]);
  const [requestedProperties, setRequestedProperties] = useState([]);
  const [showNoProducts, setShowNoProducts] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);

  useEffect(() => {
    getPropertyList();
    getRequestedProperties();
    checkLoginStatus();
    getCategoriesList();
  }, []);

  const getCategoriesList = async () => {
    try {
      const response = await AxiosDashboard.get("/categories");
      const categories = response.data;
      setCategoriesList(categories);

      const names = categories.map(category => category.name);
      setCategoryNames(names);
    } catch (error) {
      console.log(error);
    }
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  const getPropertyList = async () => {
    try {
      const response = await AxiosWeb.get("/properties?category_id=24");
      setPropertyList(response.data.data);
      setFilteredPropertyList(response.data.data);
      // getCityNames(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCityNames = async properties => {
    try {
      const cityNames = await Promise.all(
        properties.map(async property => {
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
        request => request.property_id
      );
      setRequestedProperties(requestedPropertyIds);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async property_id => {
    try {
      await AxiosWeb.post(`/requests/${property_id}`);
      console.log("Request submitted successfully!");
      setRequestedProperties(prevState => [...prevState, property_id]);
    } catch (error) {
      console.log(error);
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
                    {categoriesList.map(category => (
                      property.category_id === category.id && (
                        <span className="mr-5" key={category.id}>
                          {category.name}
                        </span>
                      )
                    ))}
                    
                    {requestedProperties.includes(property.id) ? (
                      <span className="requestedSpan">Already requested</span>
                    ) : isLoggedIn ? (
                      <Btn
                        onClick={() => handleRequest(property.id)}
                        title="Request"
                        className="btn updateBtnProperty ud-btn btn-secondary mt-0 updateBtn fs-5"
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
