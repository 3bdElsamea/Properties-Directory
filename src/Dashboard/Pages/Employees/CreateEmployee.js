import React, { useState, useEffect } from "react";
import { AxiosDashboard } from "../../../Axios";
import { useNavigate } from "react-router-dom";

import {
  CardBody,
  FormGroup,
  Input,
  Col,
  Row,
  Card,
  CardHeader,
  Container,
  Button,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";

//use formik
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [selectedFileName, setSelectedFileName] = useState("Choose file");


  //to get all roles
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    try {
      const response = await AxiosDashboard.get(`/roles`);
      setRoles(response.data?.roles.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);


  //Define validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required.")
      .matches(/^[a-zA-Z ]+$/, "Name should contain only letters and spaces."),
    email: Yup.string().email("Invalid email.").required("Email is required."),
    username: Yup.string().required("Username is required."), 
    phone: Yup.string()
      .required("Phone is required.")
      .matches(/[0-9]/, "Phone should contain at least one numeric character."),

    password: Yup.string()
      .min(8)
      .max(10, "Password must not exceed 10 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must be at least one lowercase, one uppercase, one number and one special character"
      )
      .required("Password is required."),

    image: Yup.mixed().required("Image is required."),
    role: Yup.string().required("Role is required."),
  });

  //Define initial values for the form fields

  const initialValues = {
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    image: null,
    role: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    setSubmitting(true);

  // Create a new FormData object
  const formData = new FormData();

  // Append the image file to the FormData object
  formData.append('image', values.image);

  // Append other form fields to the FormData object
  formData.append('name', values.name);
  formData.append('email', values.email);
  formData.append('username', values.username);
  formData.append('phone', values.phone);
  formData.append('password', values.password);
  formData.append('role_id', values.role);

  // Send form data to the API
  try {
    await AxiosDashboard.post('/employees', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },
    });
    navigate('/dashboard/employees');
  } catch (error) {
    console.log(error);
  }

  setSubmitting(false);
  };

  return (
    <Container className="mt--6">
      <Row className="justify-content-center">
        <Col className="order-xl-1 ms-auto" xl="8">
          <Card className="bg-white shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center justify-content-center">
                <Col xs="8">
                  <h3 className="mb-0">Employee Account</h3>
                </Col>
                <Col className="text-right">
                  <Link to={"/dashboard/employees"}>
                    <Button className="btn btn-danger btn-sm" type="button">
                      <i className="fa fa-arrow-left mr-2"> Back</i>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      Emolyee Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="name"
                            >
                              Name
                            </label>
                            <Input
                              id="name"
                              placeholder="Name"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                touched.name && errors.name
                                  ? "is-invalid"
                                  : null
                              }
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="username"
                            >
                              Username
                            </label>
                            <Input
                              id="username"
                              placeholder="username"
                              name="username"
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                touched.username && errors.username
                                  ? "is-invalid"
                                  : null
                              }
                            />
                            <ErrorMessage
                              name="username"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                        </Col>


                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="email"
                            >
                              Email address
                            </label>
                            <Input
                              id="email"
                              placeholder="Email"
                              name="email"
                              type="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                touched.email && errors.email
                                  ? "is-invalid"
                                  : null
                              }
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="phone"
                            >
                              Phone
                            </label>
                            <Input
                              id="phone"
                              placeholder="Phone"
                              type="text"
                              name="phone"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                touched.phone && errors.phone
                                  ? "is-invalid"
                                  : null
                              }
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="password"
                            >
                              Password
                            </label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                touched.password && errors.password
                                  ? "is-invalid"
                                  : null
                              }
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="image"
                            >
                              Image
                            </label>
                            <div className="custom-file">
                              <Label
                                className="custom-file-label"
                                htmlFor="image"
                              >
                                {selectedFileName}
                              </Label>

                              <div className="custom-file">
                                <Input
                                  type="file"
                                  id="image"
                                  name="image"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "image",
                                      event.currentTarget.files[0]
                                    );
                                    setSelectedFileName(
                                      event.currentTarget.files[0].name
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  className={
                                    touched.image && errors.image
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <ErrorMessage
                                  name="image"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="role"
                            >
                              Role
                            </label>
                            <Input
                              placeholder="Role"
                              type="select"
                              id="role"
                              name="role"
                              value={values.role}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                touched.role && errors.role
                                  ? "is-invalid"
                                  : null
                              }
                            >
                              <option value="" disabled selected>
                                Select Role
                              </option>
                              {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                  {role.name}
                                </option>
                              ))}

                            </Input>
                            <ErrorMessage
                              name="role"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12 text-center mt-5">
                          <FormGroup>
                            <button
                              className="btn btn-primary py-2 px-4"
                              type="submit"
                              disabled={isSubmitting}
                              loading={isSubmitting}
                              onClick={handleSubmit}
                            >
                              Save
                            </button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEmployee;
