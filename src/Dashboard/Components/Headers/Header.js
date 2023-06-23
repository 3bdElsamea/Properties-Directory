
import React, { useState, useEffect } from "react";
import { AxiosDashboard } from "../../../Axios";
import {
  Button,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

const Header = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosDashboard.get("/statistic");
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  }, []);


  // Define a function to map the statistic name to the corresponding icon
  const getStatisticIcon = (name) => {
    switch (name) {
      case "Customer":
        return <i className="fas fa-users  " />;
      case "Category":
        return <i className="fas fa-shopping-cart " />;
      case "Active Property":
        return <i className="fas fa-dollar-sign" />;
      case "Pending Property Request":
        return <i className="fas fa-clock " />;
      case "City":
        return <i className="fas fa-city " />;
      case "Employee":
        return <i className="fas fa-user " />;
      case "Inactive Property":
        return <i className="fas fa-ban " />;
      case "Approved Property Request":
        return <i className="fas fa-check-circle" />;
      case "ContactUs":
        return <i className="fas fa-envelope " />;
      case "Owner":
        return <i className="fas fa-user-circle " />;
      case "Property General Request":
        return <i className="fas fa-question-circle " />;
      case "Rejected Property Request":
        return <i className="fas fa-times-circle " />;
      case "Country":
        return <i className="fas fa-globe " />;
      case "Property":
        return <i className="fas fa-home" />;
      case "Property Request":
        return <i className="fas fa-file-alt " />;
      default:
        return <i className="fas fa-chart-bar" />;
    }
  };
  
  return (
    <>
      <div className="header bg-gradient-info pb-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row  >
              {statistics.map((statistic, index) => (
                <Col key={index} lg="6" xl="3" className="mb-2">
                  <Card className="card-stats mb-4 mb-xl-0 h-100">
                    <CardBody>
                      <Row >
                        <div className="col-9 ">
                          <CardTitle
                            tag="h5"
                            className=" text-muted mb-0"
                          >
                            {statistic.name}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {statistic.count}
                          </span>
                        </div>
                        <Col className="col-3">
                        <div className="icon icon-shape  bg-danger text-white rounded-circle shadow">
                        {getStatisticIcon(statistic.name)}
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;