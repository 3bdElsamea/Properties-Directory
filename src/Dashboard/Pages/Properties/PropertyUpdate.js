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

const PropertyUpdate = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [propertyInfo, setPropertyInfo] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    image: "",
    area: "",
    bathrooms: "",
    bedrooms: "",
    garage: "",
    floors: "",
    year_built: "",
    status: "",
    category_id: "",
    city_id: "",
    property_type_id: "",
    owner_id: "",
    employee_id: "",
  });

  useEffect(() => {
    getPropertyDetails();
  }, []);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      // Read the image file and set it in the state
      setPropertyInfo({ ...propertyInfo, image: reader.result });
    };
  
    if (file) {
      // Start reading the file as a data URL
      reader.readAsDataURL(file);
    }
  };
  
  const getPropertyDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/Properties/${propertyId}`);
      setPropertyInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyInfo({ ...propertyInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.put(
        `http://localhost:5000/Properties/${propertyId}`,
        propertyInfo
      );
      console.log(response.data);
      // Redirect to Properties list or show success message
      navigate("/admin/Properties");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1" xl="8">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Update Property</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <h6 className="heading-small text-muted mb-4">
                  Property information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-title">
                          Title
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Title"
                          name="title"
                          value={propertyInfo.title}
                          onChange={handleChange}
                        />
                      
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-description">
                          Description
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Description"
                          name="description"
                          value={propertyInfo.description}
                          onChange={handleChange}
                        />
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-price">
                          Price
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Price"
                          name="price"
                          value={propertyInfo.price}
                          onChange={handleChange}
                        />
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-image">
                          Image
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="file"
                          accept="image/*"
                          name="image"
                          onChange={handleFileChange}
                        />
                        
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-area">
                          Area
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Area"
                          name="area"
                          value={propertyInfo.area}
                          onChange={handleChange}
                        />
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-bathrooms">
                          Bathrooms
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Number of Bathrooms"
                          name="bathrooms"
                          value={propertyInfo.bathrooms}
                          onChange={handleChange}
                        />
                      
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-bedrooms">
                          Bedrooms
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Number of Bedrooms"
                          name="bedrooms"
                          value={propertyInfo.bedrooms}
                          onChange={handleChange}
                        />
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-garage">
                          Garage
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Garage"
                          name="garage"
                          value={propertyInfo.garage}
                          onChange={handleChange}
                        />
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-floors">
                          Floors
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Number of Floors"
                          name="floors"
                          value={propertyInfo.floors}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-year-built">
                          Year Built
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Year Built"
                          name="year_built"
                          value={propertyInfo.year_built}
                          onChange={handleChange}
                        />
                        
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="7">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-status">
                          Status
                        </label>
                        <Input
                          type="select"
                          name="status"
                          value={propertyInfo.status}
                          onChange={handleChange}
                        >
                          <option value="">Select status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Pending">Pending</option>
                        </Input>
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-category-id">
                          Category ID
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Category ID"
                          name="category_id"
                          value={propertyInfo.category_id}
                          onChange={handleChange}
                        />
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-city-id">
                          City ID
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter City ID"
                          name="city_id"
                          value={propertyInfo.city_id}
                          onChange={handleChange}
                        />
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-property-type-id">
                          Property Type ID
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Property Type ID"
                          name="property_type_id"
                          value={propertyInfo.property_type_id}
                          onChange={handleChange}
                        />
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-owner-id">
                          Owner ID
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Owner ID"
                          name="owner_id"
                          value={propertyInfo.owner_id}
                          onChange={handleChange}
                        />
                        
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Update Property
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyUpdate;
