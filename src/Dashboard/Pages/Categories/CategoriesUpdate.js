import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import axios from "axios";
import { AxiosDashboard } from '../../../Axios';

const CategoriesUpdate = () => {
    const { CategoryId } = useParams();
    const navigate = useNavigate();
    const [CategoryInfo, setCategoryInfo] = useState({
      id: "",
      name: "",
      active: "",
      
    });
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      getCategoryDetails();
    }, []);
  
    const getCategoryDetails = async () => {
      try {
        const response = await AxiosDashboard.get(`/Categories/${CategoryId}`);
        setCategoryInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCategoryInfo({ ...CategoryInfo, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Perform form validation
      const validationErrors = {};
      if (!CategoryInfo.name) {
        validationErrors.name = "Name is required";
      } else if (!/^[A-Za-z\s]+$/.test(CategoryInfo.name)) {
        validationErrors.name = "Name should only contain characters";
      }
  
  
  
      if (!CategoryInfo.active) {
        validationErrors.status = "Status is required";
      }
  
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
  
      try {
        const response = await axios.put(`/Categories/${CategoryId}`, CategoryInfo);
        console.log(response.data);
        // Redirect to Home or show success message
        navigate("/dashboard/Categories");
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
                    <h3 className="mb-0">Update Category</h3>
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
                            value={CategoryInfo.name}
                            onChange={handleChange}
                          />
                          {errors.name && (
                            <div className="text-danger">{errors.name}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                   
                    <Row>
                      <Col lg="7">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-status">
                            active
                          </label>
                          <Input
                            type="select"
                            name="active"
                            value={CategoryInfo.active}
                            onChange={handleChange}
                          >
                            <option value="">Select status</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </Input>
                          {errors.status && (
                            <div className="text-danger">{errors.status}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <Row>
                    <Col lg="12">
                      <Button variant="primary" color="primary" type="submit">
                        Update
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

export default CategoriesUpdate
