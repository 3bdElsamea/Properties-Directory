import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { AxiosDashboard } from "../../../Axios";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});

  const getCustomer = async () => {
    try {
      const response = await AxiosDashboard.get(`/customers/${id}`);
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
        <Col className="mx-auto w-50">
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
            <CardBody className="py-5">
              <Row className="justify-content-center">
                <Col xs="8" className="text-left">
                  <Row>
                    <Col xs="2" >
                      <h6 className="mb-0">UserName:</h6>
                    </Col>
                    <Col>
                      <p className="mb-0">{customer.username}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="2">
                      <h6 className="mb-0">Name:</h6>
                    </Col>
                    <Col>
                      <p className="mb-0">{customer.name}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="2">
                      <h6 className="mb-0">Email:</h6>
                    </Col>
                    <Col >
                      <p className="mb-0">{customer.email}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="2">
                      <h6 className="mb-0">Phone:</h6>
                    </Col>
                    <Col>
                      <p className="mb-0">{customer.phone}</p>
                    </Col>
                  </Row>
                </Col>
                <Col xs="4 justify-content-center align-items-center">
                  <img
                    alt="..."
                    src={customer.image}
                    style={{ width: "150px", height: "50px" }}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerDetails;
