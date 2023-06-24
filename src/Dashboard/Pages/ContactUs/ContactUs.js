import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "reactstrap";
import { AxiosDashboard } from "../../../Axios";
import "./ContactUs.css";

const empPermissions = localStorage.getItem("permissions");

const Contact = () => {
  const [contactData, setContactData] = useState([]);
  const [contactDataLoading, setContactDataLoading] = useState(false);
  const [contactDataError, setContactDataError] = useState(false);
  const [contactDataErrorMessage, setContactDataErrorMessage] = useState("");

  const getContactData = async () => {
    try {
      setContactDataLoading(true);
      const response = await AxiosDashboard.get("/Contact-us");
      const { data } = response.data;
      setContactData(data);
      setContactDataLoading(false);
    } catch (error) {
      setContactDataLoading(false);
      setContactDataError(true);
      setContactDataErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getContactData();
  }, []);

  if (empPermissions.split(",").includes("contact_us")) {
    return (
      <Container className="mt--6">
        <Card className="shadow w-100">
          <CardHeader className="contact-card-header">
            <h5 className="contact-card-title mb-0">ContactUs</h5>
          </CardHeader>
          {contactDataLoading ? (
            <p className="text-center">Loading contact data...</p>
          ) : contactDataError ? (
            <p>Error loading contact data: {contactDataErrorMessage}</p>
          ) : (
            <Row>
              {contactData.map((contactItem, index) => (
                <Col key={index} lg={12} md={12} sm={12} className="px-5 py-3">
                  <Card className="contact-card">
                    <CardHeader className="d-flex justify-content-between header">
                      <p className="mb-0">
                        From: <span>{contactItem.name}</span>
                      </p>
                      <p className="mb-0">
                        Email: <span>{contactItem.email}</span>
                      </p>
                      <p className="mb-0">
                        Phone: <span>{contactItem.phone}</span>
                      </p>
                    </CardHeader>
                    <CardBody>
                      <p>{contactItem.message}</p>
                    </CardBody>
                    <CardFooter className="contact-card-footer d-flex align-items-center justify-content-between">
                      <p className="contact-card-timestamp">
                        Sent:
                        <span>
                          {" "}
                          {new Date(contactItem.created_at).toLocaleString()}
                        </span>
                      </p>
                      <span
                        className={`status-badge ${contactItem.status.toLowerCase()}`}
                      >
                        {contactItem.status}
                      </span>
                    </CardFooter>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card>
      </Container>
    );
  } else {
    window.location.href = "/ErrorPage";
  }
};

export default Contact;
