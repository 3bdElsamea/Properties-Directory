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

const CategoriesAdd = () => {
  const [categoriesInfo, setCategoriesInfo] = useState({
    name: "",
    active: "",
    created_at:""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoriesInfo({ ...categoriesInfo, [name]: value });
    // setCategoriesInfo({ ...categoriesInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    const validationErrors = {};
    if (!categoriesInfo.name) {
      validationErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(categoriesInfo.name)) {
      validationErrors.name = "Name should only contain characters";
    }

    if (!categoriesInfo.active) {
      validationErrors.active = "Status is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await AxiosDashboard.post('/Categories', categoriesInfo);
      console.log(response.data);
      // TODO: Redirect to Home
      window.location.href = '/dashboard/Categories';
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
                  <h3 className="mb-0">Add New Category</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <h6 className="heading-small text-muted mb-4">
                  Category information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-name">
                          Name
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Name"
                          name="name"
                          value={categoriesInfo.name}
                          onChange={handleChange}
                          invalid={!!errors.name}
                        />
                        <div className="invalid-feedback">{errors.name}</div>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="7">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-national-id">
                          Active
                        </label>
                        <Input
                          type="select"
                          name="active"
                          value={categoriesInfo.active}
                          onChange={handleChange}
                          invalid={!!errors.active}
                        >
                          <option value="">Select</option>
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </Input>
                        <div className="invalid-feedback">{errors.active}</div>
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
}

export default CategoriesAdd;
