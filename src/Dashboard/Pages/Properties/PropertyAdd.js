import React from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const PropertyAdd = () => {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
    .required("Name is required.")
    .matches(/^[a-zA-Z ]+$/, "Name should contain only letters and spaces."),
    description: Yup.string()
    .required("Name is required.")
    .matches(/^[a-zA-Z ]+$/, "Name should contain only letters and spaces."),
    price: Yup.number().required("Price is required"),
    image: Yup.mixed().required("Image is required"),
    area: Yup.number().required("Area is required"),
    bathrooms: Yup.number().required("Number of bathrooms is required"),
    bedrooms: Yup.number().required("Number of bedrooms is required"),
    garage: Yup.number().required("Number of garage is required"),
    floors: Yup.number().required("Number of floors is required"),
    year_built: Yup.number().required("Year built is required"),
    status: Yup.string().required("Status is required"),
    category_id: Yup.string().required("Category ID is required"),
    city_id: Yup.string().required("City ID is required"),
    property_type_id: Yup.string().required("Property Type ID is required"),
    owner_id: Yup.string().required("Owner ID is required"),
    employee_id: Yup.string().required("Employee ID is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/Properties", values);
      console.log(response.data);
      // TODO: Redirect to Home
      window.location.href = "/admin/properties";
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      image: null,
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
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
  };

  return (
    <div>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-white shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add New Property</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={formik.handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Property information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-name">
                            Title
                          </label>
                          <Input
                            className="form-control-alternative w-100"
                            type="text"
                            placeholder="Enter Title"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.title && formik.errors.title && (
                            <div className="text-danger">{formik.errors.title}</div>
                          )}
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
                            type="textarea"
                            placeholder="Enter Description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.description && formik.errors.description && (
                            <div className="text-danger">{formik.errors.description}</div>
                          )}
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
                            type="number"
                            placeholder="Enter Price"
                            name="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.price && formik.errors.price && (
                            <div className="text-danger">{formik.errors.price}</div>
                          )}
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
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.image && formik.errors.image && (
                            <div className="text-danger">{formik.errors.image}</div>
                          )}
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
                            type="number"
                            placeholder="Enter Area"
                            name="area"
                            value={formik.values.area}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.area && formik.errors.area && (
                            <div className="text-danger">{formik.errors.area}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-bathrooms">
                            Bathrooms
                          </label>
                          <Input
                            className="form-control-alternative w-100"
                            type="number"
                            placeholder="Enter Number of Bathrooms"
                            name="bathrooms"
                            value={formik.values.bathrooms}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.bathrooms && formik.errors.bathrooms && (
                            <div className="text-danger">{formik.errors.bathrooms}</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-bedrooms">
                            Bedrooms
                          </label>
                          <Input
                            className="form-control-alternative w-100"
                            type="number"
                            placeholder="Enter Number of Bedrooms"
                            name="bedrooms"
                            value={formik.values.bedrooms}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.bedrooms && formik.errors.bedrooms && (
                            <div className="text-danger">{formik.errors.bedrooms}</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-garage">
                            Garage
                          </label>
                          <Input
                            className="form-control-alternative w-100"
                            type="number"
                            placeholder="Enter Number of Garage"
                            name="garage"
                            value={formik.values.garage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.garage && formik.errors.garage && (
                            <div className="text-danger">{formik.errors.garage}</div>
                          )}
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
                            type="number"
                            placeholder="Enter Number of Floors"
                            name="floors"
                            value={formik.values.floors}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.floors && formik.errors.floors && (
                            <div className="text-danger">{formik.errors.floors}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-year_built">
                            Year Built
                          </label>
                          <Input
                            className="form-control-alternative w-100"
                            type="number"
                            placeholder="Enter Year Built"
                            name="year_built"
                            value={formik.values.year_built}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.year_built && formik.errors.year_built && (
                            <div className="text-danger">{formik.errors.year_built}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                      <FormGroup>
  <label className="form-control-label" htmlFor="input-status">
    Status
  </label>
  <Input
    className="form-control-alternative w-100"
    type="select"
    name="status"
    value={formik.values.status}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  >
    <option value="">Select Status</option>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
    <option value="Pending">Pending</option>
  </Input>
  {formik.touched.status && formik.errors.status && (
    <div className="text-danger">{formik.errors.status}</div>
  )}
</FormGroup>

                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-category_id">
                            Category ID
                          </label>
                          <Input
                            className="form-control-alternative w-100"
                            type="text"
                            placeholder="Enter Category ID"
                            name="category_id"
                            value={formik.values.category_id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.category_id && formik.errors.category_id && (
                            <div className="text-danger">{formik.errors.category_id}</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-city_id">
                            City ID
                          </label>
                          <Input
                            className="form-control-alternative w-100"
                            type="text"
                            placeholder="Enter City ID"
                            name="city_id"
                            value={formik.values.city_id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.city_id && formik.errors.city_id && (
                            <div className="text-danger">{formik.errors.city_id}</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-property_type_id">
                            Property Type ID
                          </label>
                          <Input
                            className="form-control-alternative w-100"
                            type="text"
                            placeholder="Enter Property Type ID"
                            name="property_type_id"
                            value={formik.values.property_type_id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.property_type_id && formik.errors.property_type_id && (
                            <div className="text-danger">{formik.errors.property_type_id}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-owner_id">
                            Owner ID
                          </label>
                          <Input
                            className="form-control-alternative w-100"
                            type="text"
                            placeholder="Enter Owner ID"
                            name="owner_id"
                            value={formik.values.owner_id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.owner_id && formik.errors.owner_id && (
                            <div className="text-danger">{formik.errors.owner_id}</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-employee_id">
                            Employee ID
                          </label>
                          <Input
                            className="form-control-alternative w-100"
                            type="text"
                            placeholder="Enter Employee ID"
                            name="employee_id"
                            value={formik.values.employee_id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.employee_id && formik.errors.employee_id && (
                            <div className="text-danger">{formik.errors.employee_id}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Add Property
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PropertyAdd;
