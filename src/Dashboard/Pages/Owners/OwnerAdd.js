import React, { useState } from "react";
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
import { AxiosDashboard } from '../../../Axios';

const OwnerAdd = () => {
  const [ownerInfo, setOwnerInfo] = useState({
    id: "",
    name: "",
    email: "",
    national_id: "",
    status: "",
    created_at: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "created_at") {
      const currentDate = new Date().toLocaleString();
      setOwnerInfo({ ...ownerInfo, [name]: currentDate });
    } else {
      setOwnerInfo({ ...ownerInfo, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    const validationErrors = {};
    if (!ownerInfo.name) {
      validationErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(ownerInfo.name)) {
      validationErrors.name = "Name should only contain characters";
    }

    if (!ownerInfo.email) {
      validationErrors.email = "Email is required";
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(ownerInfo.email)
    ) {
      validationErrors.email = "Invalid email format";
    }

    if (!ownerInfo.phone) {
      validationErrors.phone = "Phone is required";
    } else if (!/^\d{11}$/.test(ownerInfo.phone)) {
      validationErrors.phone = "Phone should have 11 digits";
    }

    if (!ownerInfo.national_id) {
      validationErrors.national_id = "National ID is required";
    } else if (!/^\d{14}$/.test(ownerInfo.national_id)) {
      validationErrors.national_id = "National ID should have 14 digits";
    }

    if (!ownerInfo.status) {
      validationErrors.status = "Status is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Set the current date and time for the created_at field
    const currentDate = new Date().toLocaleString();
    setOwnerInfo({ ...ownerInfo, created_at: currentDate });

    try {
      const response = await AxiosDashboard.post("/owners", ownerInfo);
      console.log(response.data);
      // TODO: Redirect to Home
      window.location.href = "/dashboard/Owners";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1" xl="8">
          <Card className="shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Add New Owner</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <h6 className="heading-small text-muted mb-4">
                  Owner information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-name"
                        >
                          Name
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Name"
                          name="name"
                          value={ownerInfo.name}
                          onChange={handleChange}
                          invalid={!!errors.name}
                        />
                        <div className="invalid-feedback">{errors.name}</div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Email address
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          value={ownerInfo.email}
                          onChange={handleChange}
                          invalid={!!errors.email}
                        />
                        <div className="invalid-feedback">{errors.email}</div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-phone"
                        >
                          Phone
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="tel"
                          placeholder="Enter Phone"
                          name="phone"
                          value={ownerInfo.phone}
                          onChange={handleChange}
                          invalid={!!errors.phone}
                        />
                        <div className="invalid-feedback">{errors.phone}</div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-national-id"
                        >
                          National ID
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter National ID"
                          name="national_id"
                          value={ownerInfo.national_id}
                          onChange={handleChange}
                          invalid={!!errors.national_id}
                        />
                        <div className="invalid-feedback">
                          {errors.national_id}
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="7">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-national-id"
                        >
                          Status
                        </label>
                        <Input
                          type="select"
                          name="status"
                          value={ownerInfo.status}
                          onChange={handleChange}
                          invalid={!!errors.status}
                        >
                          <option value="">Select status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Pending">Pending</option>
                        </Input>
                        <div className="invalid-feedback">{errors.status}</div>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>

                <hr className="my-4" />

                <Row>
                  <Col lg="12">
                    <Button variant="primary" color="primary" type="submit">
                      Add
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OwnerAdd;
