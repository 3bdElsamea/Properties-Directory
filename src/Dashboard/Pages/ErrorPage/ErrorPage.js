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
// core components

const ErrorPage = () => {
  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <img
            alt="..."
            className="rounded-circle"
            src={require("../../Assets/img/theme/errorPage.jpg")}
              style={{     "max-width":" 641px",
                       "margin-top": "125px",
                       "margin":"auto" }}
            />
         
        </Row>
        <Row className="text-center" md="6">
           
           <Button color="primary" tag="a" href="/">
             Go to Home
           </Button>
        
     </Row>
      </Container>
    </>
  );
};

export default ErrorPage;

      
