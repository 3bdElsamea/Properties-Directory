import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosDashboard } from "../../../Axios";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

const empPermissions = localStorage.getItem("permissions");

const OwnerDetails = () => {
  const { ownerId } = useParams();
  const [owner, setOwner] = useState({});

  const getOwnerDetails = async () => {
    try {
      const response = await AxiosDashboard.get(`/owners/${ownerId}`);
      setOwner(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOwnerDetails();
  }, []);

  if (empPermissions.split(",").includes("owner")) {
    return (
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Owner Information</h3>
                  </Col>
                </Row>
                <Col className="text-right">
                  <Link to={"/dashboard/owners"}>
                    <Button className="btn btn-danger btn-sm" type="button">
                      <i className="fa fa-arrow-left mr-2"> Back</i>
                    </Button>
                  </Link>
                </Col>
              </CardHeader>

              {owner ? (
                <div>
                  <CardBody>
                    <Row>
                      <Col xs={12} md={6}>
                        <div className="d-flex flex-column">
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-envelope mr-2 text-info"></i>
                            <span className="font-weight-bold mr-1">Name:</span>
                            {owner.name}
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-dollar-sign mr-2 text-info"></i>
                            <span className="font-weight-bold mr-1">
                              Email:
                            </span>
                            {owner.email}
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-align-left mr-2 text-info"></i>
                            <span className="font-weight-bold mr-1">
                              Phone:
                            </span>
                            {owner.phone}
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-ruler-combined mr-2 text-info"></i>
                            <span className="font-weight-bold mr-1">
                              National ID:
                            </span>
                            {owner.national_id}
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-tag mr-2 text-info"></i>
                            <span className="font-weight-bold mr-1">
                              Status:
                            </span>
                            {owner.status}
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-city mr-2 text-info"></i>
                            <span className="font-weight-bold mr-1">
                              Created At:
                            </span>
                            {owner.created_At} {/* Updated property name */}
                          </div>
                        </div>
                      </Col>
                      {/* <Col xs={12} md={6}>
                      <Image
                        src={owner.image}
                        alt="Owner"
                        circle
                        width="100%"
                        height="auto"
                        style={{ marginBottom: '20px' }}
                      />
                    </Col> */}
                    </Row>
                  </CardBody>
                </div>
              ) : (
                <p>Loading Owner details...</p>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  } else {
    window.location.href = "/ErrorPage";
  }
};

export default OwnerDetails;
