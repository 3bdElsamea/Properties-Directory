import { Card } from "reactstrap";
import { Link } from "react-router-dom";
import { Container, Row, Col, CardBody, CardHeader, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployees] = useState({});

  const getEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/employees/${id}`);
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Container className="mt--5 " fluid>
      <Row>
        <Col className="mx-auto w-75">
          <Card className="shadow py-3 ">
            <CardHeader>
              <Row className="align-items-center ">
                <Col className="text-left">
                  <h6>Employee Information</h6>
                </Col>
                <Col className="text-right">
                  <Link to={"/dashboard/employees"}>
                    <Button className="btn btn-danger btn-sm" type="button">
                      <i className="fa fa-arrow-left mr-2"> Back</i>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row className="bg-danger">
                <Col className="md-auto">
                  <div className="card-profile-image">
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={employee.image}
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
                  {employee.name}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md="auto">
                  <i className="fa fa-envelope"></i>
                </Col>
                <Col>
                  <span className="font-weight-bold mr-1">Email:</span>
                  {employee.email}
                </Col>
              </Row>
              <Row>
                <Col md="auto">
                  <i className="fa fa-phone "></i>
                </Col>
                <Col>
                  <span className="font-weight-bold mr-1">Phone:</span>
                  {employee.phone}
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md="auto">
                  <i class="fa fa-shield-halved"></i>
                </Col>
                <Col>
                  <span className="font-weight-bold mr-1">Role:</span>
                  {employee.role}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeDetails;
