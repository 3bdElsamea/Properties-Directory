import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});

  const getCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/details/Customers/${id}`);
      setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <Container className="mt--5" fluid>
      <Row>
        <Col className="mx-auto w-75">
          <Card className="shadow ">
            <CardHeader>
              <Row className="align-items-center ">
                <Col className="text-left">
                  <h6>Customer Information</h6>
                </Col>
                <Col className="text-right">
                  <Link to={"/dashboard/customers"}>
                    <Button className="btn btn-danger btn-sm" type="button">
                      <i className="fa fa-arrow-left mr-2"> Back</i>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="jusitify-content-end">
                  <div className="card-profile-image">
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={customer.image}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md="auto">
                  <i className="fa fa-user"></i>
                </Col>
                <Col>
                  <span className="font-weight-bold mr-1">Name:</span>
                  {customer.name}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md="auto">
                  <i className="fa fa-envelope"></i>
                </Col>
                <Col>
                  <span className="font-weight-bold mr-1">Email:</span>
                  {customer.email}
                </Col>
              </Row>
              <Row>
                <Col md="auto">
                  <i className="fa fa-phone "></i>
                </Col>
                <Col>
                  <span className="font-weight-bold mr-1">Phone:</span>
                  {customer.phone}
                </Col>
              </Row>
            </CardBody>
            <CardHeader>
              <Row className="align-items-center mt-3 ">
                <Col className="text-left">
                  <h6>Customer Properties</h6>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerDetails;
