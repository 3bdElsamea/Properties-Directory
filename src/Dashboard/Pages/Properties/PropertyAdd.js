import React, { useEffect, useState } from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import { AxiosDashboard } from "../../../Axios";

const empPermissions = localStorage.getItem("permissions");

const PropertyAdd = () => {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required.")
      .matches(/^[a-zA-Z ]+$/, "Title should contain only letters and spaces."),
    slug: Yup.string().required("Slug is required."),
    description: Yup.mixed()
    .required("Description is required."),
    
    address: Yup.string()
    .required("address is required.")
    .matches(
      /^[a-zA-Z ,.]+$/,
      "address should contain only letters, spaces, periods, and commas."
    ),
    price: Yup.number().positive("Price must be a positive number").required("Price is required"),
    image: Yup.mixed().required("Image is required"),
    area: Yup.number().positive("Area must be a positive number").required("Area is required"),
  bathrooms: Yup.number().positive("Number of bathrooms must be a positive number").required("Number of bathrooms is required"),
  bedrooms: Yup.number().positive("Number of bedrooms must be a positive number").required("Number of bedrooms is required"),
    garage: Yup.number().min(0, "Number of garage must be zero or a positive number").required("Number of garage is required"),
    floors: Yup.number().positive("Number of floors must be a positive number").required("Number of floors is required"),
    year_built: Yup.number().positive("Year built must be a positive number").required("Year built is required"),
    status: Yup.string().required("Status is required"),
    category_id: Yup.string().required("Category ID is required"),
    city_id: Yup.string().required("City ID is required"),
    owner_id: Yup.string().required("Owner ID is required"),
    employee_id: Yup.string().required("Employee ID is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      const response = await AxiosDashboard.post("/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      // TODO: Redirect to Home
      window.location.href = "/dashboard/Properties";
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      address:"",
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
      owner_id: "",
      employee_id: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const [ownerOptions, setOwnerOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [catageoryOptions, setCatageoryOptions] = useState([]);
  const [ciyOptions, setCityOptions] = useState([]);

  useEffect(() => {
    fetchOwners();
    fetchEmployees();
    fetchCities();
    fetchCatageroies();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await AxiosDashboard.get("/owners?limit=100"); // Replace with the correct URL for fetching owners data
      const owners = response.data.data;
      const ownerOptions = owners.map((owner) => ({
        value: owner.id,
        label: owner.name,
      }));
      setOwnerOptions(ownerOptions);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchEmployees = async () => {
    try {
      const response = await AxiosDashboard.get("/employees?limit=100"); // Replace with the correct URL for fetching owners data
      const employees = response.data.data;
      const employeeOptions = employees.map((employee) => ({
        value: employee.id,
        label: employee.name,
      }));
      setEmployeeOptions(employeeOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await AxiosDashboard.get("/cities?limit=100"); // Replace with the correct URL for fetching owners data
      const cities = response.data.data;
      const cityOptions = cities.map((city) => ({
        value: city.id,
        label: city.name,
      }));
      setCityOptions(cityOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCatageroies = async () => {
    try {
      const response = await AxiosDashboard.get("/categories"); // Replace with the correct URL for fetching owners data
      const categories = response.data;
      const catageoryOptions = categories.map((city) => ({
        value: city.id,
        label: city.name,
      }));
      setCatageoryOptions(catageoryOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
  };

  if (empPermissions.includes("property")) {
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
                    <h6 className="heading-small text-muted mb-4">
                      Property information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-name"
                            >
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
                              <div className="text-danger">
                                {formik.errors.title}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-name"
                            >
                              Slug
                            </label>
                            <Input
                              className="form-control-alternative w-100"
                              type="text"
                              placeholder="Enter slug"
                              name="slug"
                              value={formik.values.slug}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.slug && formik.errors.slug && (
                              <div className="text-danger">
                                {formik.errors.slug}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative w-100"
                              type="textarea"
                              placeholder="Enter address"
                              name="address"
                              value={formik.values.address}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.address &&
                              formik.errors.address && (
                                <div className="text-danger">
                                  {formik.errors.address}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-description"
                            >
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
                            {formik.touched.description &&
                              formik.errors.description && (
                                <div className="text-danger">
                                  {formik.errors.description}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-price"
                            >
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
                              <div className="text-danger">
                                {formik.errors.price}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-image"
                            >
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
                              <div className="text-danger">
                                {formik.errors.image}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-area"
                            >
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
                              <div className="text-danger">
                                {formik.errors.area}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-bathrooms"
                            >
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
                            {formik.touched.bathrooms &&
                              formik.errors.bathrooms && (
                                <div className="text-danger">
                                  {formik.errors.bathrooms}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-bedrooms"
                            >
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
                            {formik.touched.bedrooms &&
                              formik.errors.bedrooms && (
                                <div className="text-danger">
                                  {formik.errors.bedrooms}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-garage"
                            >
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
                              <div className="text-danger">
                                {formik.errors.garage}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-floors"
                            >
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
                              <div className="text-danger">
                                {formik.errors.floors}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-year_built"
                            >
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
                            {formik.touched.year_built &&
                              formik.errors.year_built && (
                                <div className="text-danger">
                                  {formik.errors.year_built}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-status"
                            >
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
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </Input>
                            {formik.touched.status && formik.errors.status && (
                              <div className="text-danger">
                                {formik.errors.status}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-category_id"
                            >
                              Category ID
                            </label>
                            <Input
                              className="form-control-alternative w-100"
                              type="select"
                              placeholder="Enter Category ID"
                              name="category_id"
                              value={formik.values.category_id}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            >
                              <option value="">Select catageory</option>
                              {catageoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Input>
                            {formik.touched.category_id &&
                              formik.errors.category_id && (
                                <div className="text-danger">
                                  {formik.errors.category_id}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city_id"
                            >
                              City ID
                            </label>
                            <Input
                              className="form-control-alternative w-100"
                              type="select"
                              placeholder="Enter City ID"
                              name="city_id"
                              value={formik.values.city_id}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            >
                              <option value="">Select city </option>
                              {ciyOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Input>
                            {formik.touched.city_id &&
                              formik.errors.city_id && (
                                <div className="text-danger">
                                  {formik.errors.city_id}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-owner_id"
                            >
                              Owner ID
                            </label>
                            <Input
                              type="select"
                              name="owner_id"
                              value={formik.values.owner_id}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            >
                              <option value="">Select Owner ID</option>
                              {ownerOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Input>
                            {formik.touched.owner_id &&
                              formik.errors.owner_id && (
                                <div className="text-danger">
                                  {formik.errors.owner_id}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-employee_id"
                            >
                              Employee ID
                            </label>
                            <Input
                              className="form-control-alternative w-100"
                              type="select"
                              name="employee_id"
                              value={formik.values.employee_id}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            >
                              <option value="">Select Employee</option>
                              {employeeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Input>
                            {formik.touched.employee_id &&
                              formik.errors.employee_id && (
                                <div className="text-danger">
                                  {formik.errors.employee_id}
                                </div>
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
  } else {
    window.location.href = "/ErrorPage";
  }
};

export default PropertyAdd;
