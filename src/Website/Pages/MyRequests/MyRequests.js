import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { AxiosWeb } from "../../../Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "../Properties/Properties-List/Properties-List.css";
import Btn from "../../../Dashboard/SharedUI/Btn/Btn";
import "./MyRequests.css";

const RequestsList = () => {
  const [requestList, setRequestList] = useState([]);
  const [requestedProperties, setRequestedProperties] = useState([]);

  useEffect(() => {
    getRequestList();
  }, []);

  const getRequestList = async () => {
    try {
      const response = await AxiosWeb.get("/requests");
      setRequestList(response.data);
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
    <div className="requests_container">
      <h3>Show All Requests</h3>
      <Row className="requestsRow">
        <Col>
          <div className="card-column-request">
            {requestList?.length > 0 &&
              requestList.map((request) => (
                <div className="card requestCard" style={{width: '80%'}} key={request.id}>
                  <div className="cardContent">
                    <a href={`/properties/${request.property_id}`}>
                      {request.Property.title}
                    </a>
                    <span>
                      <FontAwesomeIcon icon={faInfoCircle} /> {request.status}{" "}
                    </span>
                    <Btn
                        className="btn btn-dark"
                      onClick={() => window.location.href = "/properties/"+request.property_id}
                      title="Details"
                    />
                    <hr className="cardHr" />
                    <span className="mr-5">
                      Requested at: {request.created_at.split("T")[0]}
                    </span>
                    
                  </div>
                </div>
              ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RequestsList;
