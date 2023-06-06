import React from "react";
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

const ErrorPage = () => {
  return (
    <>
      <Container >
        <Row>
          <Col xs={6} md={6} className="order-md-1 order-2">
            <img
              alt="Error Page"
              src={require("../../Assets/img/theme/errorPage.jpg")}
              style={{
                maxWidth: "732px",
                marginTop: "160px",
                margin: "auto",
              }}
            />
          </Col>
          <Col xs={6} md={6} className="order-md-2 order-1">
          <div style={{ marginTop: "350px", textAlign: "center" }}>
            <h4>OOOPS! Something went wrong. The page you are looking for does not exist.</h4>
            <Button color="primary" tag="a" href="/admin/index">
              Go to Home
            </Button>
          </div>
        </Col>

          
        </Row>
      </Container>
    </>
  );
};

export default ErrorPage;
