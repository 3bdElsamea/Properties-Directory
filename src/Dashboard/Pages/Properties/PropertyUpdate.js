
import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CardBody,
  FormGroup,
  Form,
  Input,
  Col,
  Row,
  Card,
  CardHeader,
  Container,
} from "reactstrap";
import Btn from "../../SharedUI/Btn/Btn";
import { AxiosDashboard } from "../../../Axios";

const empPermissions = localStorage.getItem("permissions");

const PropertyUpdate = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [propertyInfo, setPropertyInfo] = useState({
    title: "",
    slug: "",
    address:"",
    description: " ",
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
    owner_id: "",
    employee_id: "", 
 });
  const [oldImage, setOldImage] = useState(""); // New state variable for old image URL
  const [updateImage, setUpdateImage] = useState(false); // New state variable to track if the image should be updated

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    slug: Yup.string().required("Slug is required"),
    description: Yup.string().required("Description is required"),
    address: Yup.string().required("address is required"),
    price: Yup.number().required("Price is required"),
    area: Yup.number().required(" is required"),
    bathrooms: Yup.number().required(" is required"),
    bedrooms: Yup.number().required(" is required"),
    garage: Yup.number().required(" is required"),
    floors: Yup.number().required(" is required"),
    year_built: Yup.number().required(" is required"),
    status: Yup.string().required(" is required"),
    city_id: Yup.number().required(" is required"),
    owner_id: Yup.number().required(" is required"),
    employee_id: Yup.number().required(" is required"),

    // Add validation rules for other fields
  });

  const formik = useFormik({
    initialValues: {
        title: "",
        slug: "",
        address:"",
        description: " ",
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
        owner_id: "",
        employee_id: "",
      },
    validationSchema,
    onSubmit: () => {
      const filteredValues = { ...formik.values };
      if (!updateImage) {
        delete filteredValues.image;
      }

      AxiosDashboard.patch(`/properties/${propertyId}`, filteredValues)
        .then((res) => {
          console.log(res.data.data);
          navigate("/dashboard/properties");
        })
        .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    AxiosDashboard.get(`/properties/${propertyId}`)
      .then((res) => {
        const {
          title,
          slug,
          address,
          description,
          price,
          image,
          area,
          bathrooms,
          bedrooms,
          garage,
          floors,
          year_built,
          status,
          category_id,
          city_id,
          owner_id,
          employee_id,
        } = res.data;

        // Set propertyInfo state
        setPropertyInfo({
          ...propertyInfo,
          title,
          slug,
          address,
          description,
          price,
          image,
          area,
          bathrooms,
          bedrooms,
          garage,
          floors,
          year_built,
          status,
          category_id,
          city_id,
          owner_id,
          employee_id,
        });

        // Set oldImage state
        setOldImage(image);

        // Set formik values
        formik.setValues({
          title,
          slug,
          address,
          description,
          price,
          image,
          area,
          bathrooms,
          bedrooms,
          garage,
          floors,
          year_built,
          status,
          category_id,
          city_id,
          owner_id,
          employee_id,
        });
      })
      .catch((err) => console.log(err));
  }, [propertyId]);

  const [ownerOptions, setOwnerOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

 
  useEffect(() => {
    AxiosDashboard.get("/owners")
      .then((res) => {
        setOwnerOptions(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    AxiosDashboard.get("/employees")
      .then((res) => {
        setEmployeeOptions(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    AxiosDashboard.get("/categories")
      .then((res) => {
        setCategoryOptions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    AxiosDashboard.get("/cities")
      .then((res) => {
        setCityOptions(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  if (empPermissions.split(",").includes("property")) {
    return (
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Update Property</h3>
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
                              htmlFor="input-title"
                            >
                              Title
                            </label>
                            <Input
                              className="form-control-alternative w-100"
                              type="text"
                              placeholder="Enter Title"
                              name="title"
                              {...formik.getFieldProps("title")}
                              invalid={
                                formik.touched.title && formik.errors.title
                              }
                            />
                            {formik.touched.title && formik.errors.title && (
                              <div className="invalid-feedback">
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
                              htmlFor="input-slug"
                            >
                              Slug
                            </label>
                            <Input
                              className="form-control-alternative w-100"
                              type="text"
                              placeholder="Enter slug"
                              name="slug"
                              {...formik.getFieldProps("slug")}
                              invalid={formik.touched.slug && formik.errors.slug}
                            />
                            {formik.touched.slug && formik.errors.slug && (
                              <div className="invalid-feedback">
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
                              type="text"
                              placeholder="Enter address"
                              name="address"
                              {...formik.getFieldProps("address")}
                              invalid={
                                formik.touched.address &&
                                formik.errors.address
                              }
                            />
                            {formik.touched.address &&
                              formik.errors.address && (
                                <div className="invalid-feedback">
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
                              type="text"
                              placeholder="Enter description"
                              name="description"
                              {...formik.getFieldProps("description")}
                              invalid={
                                formik.touched.description &&
                                formik.errors.description
                              }
                            />
                            {formik.touched.description &&
                              formik.errors.description && (
                                <div className="invalid-feedback">
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
                              type="text"
                              placeholder="Enter Price"
                              name="price"
                              {...formik.getFieldProps("price")}
                              invalid={
                                formik.touched.price && formik.errors.price
                              }
                            />
                            {formik.touched.price && formik.errors.price && (
                              <div className="invalid-feedback">
                                {formik.errors.price}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <FormGroup>
                    <label className="form-control-label" htmlFor="input-image">
                      Image
                    </label>
                    {oldImage && (
                      <div>
                        <img
                          src={oldImage}
                          alt="Old Image"
                          className="img-fluid mb-3"
                        />
                        <FormGroup check>
                          <label check>
                            <Input
                              type="checkbox"
                              checked={updateImage}
                              onChange={(event) =>
                                setUpdateImage(event.target.checked)
                              }
                            />{" "}
                            Update Image
                          </label>
                        </FormGroup>
                      </div>
                    )}
                    {(!oldImage || updateImage) && (
                      <Input
                        className="form-control-alternative"
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={(event) => {

                          formik.setFieldValue(
                            "image",
                            event.currentTarget.files[0]
                          );
                        }}
                        invalid={formik.touched.image && formik.errors.image}
                      />
                    )}
                    {formik.touched.image && formik.errors.image && (
                      <div className="invalid-feedback">
                        {formik.errors.image}
                      </div>
                    )}
                  </FormGroup>
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
                              type="text"
                              placeholder="Enter area"
                              name="area"
                              {...formik.getFieldProps("area")}
                              invalid={formik.touched.area && formik.errors.area}
                            />
                            {formik.touched.area && formik.errors.area && (
                              <div className="invalid-feedback">
                                {formik.errors.area}
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
                              htmlFor="input-bathrooms"
                            >
                              Bathrooms
                            </label>
                            <Input
                              className="form-control-alternative w-100"
                              type="text"
                              placeholder="Enter Number of Bathrooms"
                              name="bathrooms"
                              {...formik.getFieldProps("bathrooms")}
                              invalid={
                                formik.touched.bathrooms &&
                                formik.errors.bathrooms
                              }
                            />
                            {formik.touched.bathrooms &&
                              formik.errors.bathrooms && (
                                <div className="invalid-feedback">
                                  {formik.errors.bathrooms}
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
                              htmlFor="input-bedrooms"
                            >
                              Bedrooms
                            </label>
                            <Input
                              className="form-control-alternative w-100"
                              type="text"
                              placeholder="Enter Number of Bedrooms"
                              name="bedrooms"
                              {...formik.getFieldProps("bedrooms")}
                              invalid={
                                formik.touched.bedrooms && formik.errors.bedrooms
                              }
                            />
                            {formik.touched.bedrooms &&
                              formik.errors.bedrooms && (
                                <div className="invalid-feedback">
                                  {formik.errors.bedrooms}
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
                              htmlFor="input-garage"
                            >
                              Garage
                            </label>
                            <Input
                              className="form-control-alternative w-100"
                              type="text"
                              placeholder="Enter Garage"
                              name="garage"
                              {...formik.getFieldProps("garage")}
                              invalid={
                                formik.touched.garage && formik.errors.garage
                              }
                            />
                            {formik.touched.garage && formik.errors.garage && (
                              <div className="invalid-feedback">
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
                              type="text"
                              placeholder="Enter Number of Floors"
                              name="floors"
                              {...formik.getFieldProps("floors")}
                              invalid={
                                formik.touched.floors && formik.errors.floors
                              }
                            />
                            {formik.touched.floors && formik.errors.floors && (
                              <div className="invalid-feedback">
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
                              htmlFor="input-year-built"
                            >
                              Year Built
                            </label>
                            <Input
                              className="form-control-alternative w-100"
                              type="text"
                              placeholder="Enter Year Built"
                              name="year_built"
                              {...formik.getFieldProps("year_built")}
                              invalid={
                                formik.touched.year_built &&
                                formik.errors.year_built
                              }
                            />
                            {formik.touched.year_built &&
                              formik.errors.year_built && (
                                <div className="invalid-feedback">
                                  {formik.errors.year_built}
                                </div>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="7">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-status"
                            >
                              Status
                            </label>
                            <Input
                              type="select"
                              name="status"
                              id="status"
                              {...formik.getFieldProps("status")}
                              invalid={
                                formik.touched.status && formik.errors.status
                              }
                            >
                              <option value="">Select status</option>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </Input>
                            {formik.touched.status && formik.errors.status && (
                              <div className="invalid-feedback">
                                {formik.errors.status}
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
                              htmlFor="input-category-id"
                            >
                              Category ID
                            </label>
                            <Input
                      type="select"
                      id="category_id"
                      name="category_id"
                      value={formik.values.category_id}
                      onChange={formik.handleChange}
                      invalid={formik.touched.category_id && formik.errors.category_id}
                    >
                      <option value="">Select a category</option>
                      {categoryOptions && categoryOptions.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Input>
                    {formik.touched.category_id && formik.errors.category_id && (
                      <div className="error">{formik.errors.category_id}</div>
                    )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city-id"
                            >
                              City ID
                            </label>
                            <Input
                      type="select"
                      id="city_id"
                      name="city_id"
                      value={formik.values.city_id}
                      onChange={formik.handleChange}
                      invalid={formik.touched.city_id && formik.errors.city_id}
                    >
                      <option value="">Select a city</option>
                      {cityOptions && cityOptions.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </Input>
                    {formik.touched.city_id && formik.errors.city_id && (
                      <div className="error">{formik.errors.city_id}</div>
                    )}
                          </FormGroup>
                        </Col>
                      </Row>
  
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-owner-id"
                            >
                              Owner ID
                            </label>
                            <Input
                      type="select"
                      id="owner_id"
                      name="owner_id"
                      value={formik.values.owner_id}
                      onChange={formik.handleChange}
                      invalid={formik.touched.owner_id && formik.errors.owner_id}
                    >
                      <option value="">Select an owner</option>
                      {ownerOptions && ownerOptions.map((owner) => (
                        <option key={owner.id} value={owner.id}>
                          {owner.name}
                        </option>
                      ))}
                    </Input>
                    {formik.touched.owner_id && formik.errors.owner_id && (
                      <div className="error">{formik.errors.owner_id}</div>
                    )}
                          </FormGroup>
                        </Col>
                      </Row>
  
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-employee_id"
                            >
                              Employee ID
                            </label>
                            <Input
                      type="select"
                      id="employee_id"
                      name="employee_id"
                      value={formik.values.employee_id}
                      onChange={formik.handleChange}
                      invalid={formik.touched.employee_id && formik.errors.employee_id}
                    >
                      <option value="">Select an employee</option>
                      {employeeOptions && employeeOptions.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name}
                        </option>
                      ))}
                    </Input>
                    {formik.touched.employee_id && formik.errors.employee_id && (
                      <div className="error">{formik.errors.employee_id}</div>
                    )}
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <div className="text-center">
                    <Btn
                    title="update"
                    onClick={formik.handleSubmit}

                    className="float-right"
                    color="primary"
                    type="submit"
                    disabled={!formik.isValid}
                  />
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    } else {
      window.location.href = "/ErrorPage";
    }
};

export default PropertyUpdate;
