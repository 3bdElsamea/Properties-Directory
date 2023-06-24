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
import { useState, useEffect } from "react";
import "./Report.css";

const empPermissions = localStorage.getItem("permissions");

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [reportDataLoading, setReportDataLoading] = useState(false);
  const [reportDataError, setReportDataError] = useState(false);
  const [reportDataErrorMessage, setReportDataErrorMessage] = useState("");

  const getReportData = async () => {
    try {
      setReportDataLoading(true);
      const response = await AxiosDashboard.get("/reports");
      const { data } = response.data;
      setReportData(data);
      setReportDataLoading(false);
    } catch (error) {
      setReportDataLoading(false);
      setReportDataError(true);
      setReportDataErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getReportData();
  }, []);

  if (empPermissions.split(",").includes("report")) {
    return (
      <Container className="mt--6 w-100">
        <Card className="shadow w-100">
          <CardHeader className="border-1">
            <h5 className="text-center mt-0">Report</h5>
          </CardHeader>
          <CardBody>
            {reportDataLoading ? (
              <p className="text-center">Loading report data...</p>
            ) : reportDataError ? (
              <p>Error loading report data: {reportDataErrorMessage}</p>
            ) : (
              <Row>
                {reportData.map((reportItem, index) => {
                  const isCustomerReport = reportItem.customer_id === null;
                  const isEmployeeReport = reportItem.employee_id === null;

                  return (
                    (isCustomerReport || isEmployeeReport) && (
                      <Col key={index} lg={4} md={6} sm={12} className="mb-4">
                        <Card className="report-card">
                          <CardBody>
                            <div className="badge-container">
                              <span
                                className={`badge ${
                                  isCustomerReport ? "customer" : "employee"
                                }`}
                              >
                                {isCustomerReport ? "Employee" : "Customer"}
                              </span>
                            </div>
                            {isCustomerReport ? (
                              <p>{reportItem.Employee.name}</p>
                            ) : (
                              <p>{reportItem.Customer.name}</p>
                            )}
                            <p>{reportItem.action}</p>
                          </CardBody>
                          <CardFooter className="footer text-danger">
                            <p className="created">
                              CreatedAt:{" "}
                              <span>
                                {" "}
                                {new Date(
                                  reportItem.created_at
                                ).toLocaleString()}
                              </span>
                            </p>
                          </CardFooter>
                        </Card>
                      </Col>
                    )
                  );
                })}
              </Row>
            )}
          </CardBody>
        </Card>
      </Container>
    );
  } else {
    window.location.href = "/ErrorPage";
  }
};

export default Report;
