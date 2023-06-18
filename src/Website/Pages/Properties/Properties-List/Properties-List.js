import "./Properties-List.css";
import React, { useEffect, useState } from "react";
import PropertiesListFilter from "./Property-List-Filter";
import { Row, Col } from "reactstrap";
import { AxiosDashboard, AxiosWeb } from "../../../../Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBath,
  faRulerCombined,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

const PropertiesList = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    getPropertyList();
  }, []);

  const getPropertyList = async () => {
    try {
      const response = await AxiosDashboard.get("/properties");
      console.log(response);
      setPropertyList(response.data.data);
      getCityNames(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCityNames = async (properties) => {
    try {
      const cityNames = await Promise.all(
        properties.map(async (property) => {
          const response = await AxiosDashboard.get(
            "/cities/" + property.city_id
          );
          return response.data.name;
        })
      );
      setCityName(cityNames);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="properties_container">
      <h3>Show All Properties</h3>
      <Row className="propertiesRow">
        <Col className="colNum1">
          <PropertiesListFilter />
        </Col>
        <Col>
          <div className="card-column">
            {propertyList.map((property, index) => (
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
                    <FontAwesomeIcon icon={faBed} /> {property.bedrooms} bed
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faBath} /> {property.bathrooms} bath
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faRulerCombined} /> {property.area}{" "}
                    sqft
                  </span>
                  <hr className="cardHr" />
                  <FontAwesomeIcon icon={faKey} />
                  <p>For Rent</p>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PropertiesList;
