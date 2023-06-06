import React, { useState } from "react";
import { AxiosDashboard } from "../../../../src/Axios";

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
} from "reactstrap";

//use formik
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateEmployee = () => {
  const navigate = useNavigate();

  //Define validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required.")
      .matches(/^[a-zA-Z ]+$/, "Name should contain only letters and spaces."),
    email: Yup.string().email("Invalid email.").required("Email is required."),

    phone: Yup.string()
      .required("Phone is required.")
      .matches(/^\+[0-9]{10,12}$/, "Phone number should be valid number."),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters.")
      .max(20, "Password must not exceed 20 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must be at least one lowercase, one uppercase, one number and one special character"
      )
      .required("Password is required."),

    image: Yup.string().required("Image is required."),
    role: Yup.string().required("Role is required."),
  });

  //Define initial values for the form fields

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    image: "",
    role: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("hellllllo");
    setSubmitting(true);

    //if the fields is empty

    //Create an object of form data to submit
    try {
      const employeeData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        image: values.image,
        role: values.role,
        blocked: false,
      };

      //Send form data to the API add blocked status
      await AxiosDashboard.post("/employees", employeeData);
      navigate("/dashboard/employees");
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
                  <h3 className="mb-0 text-center">Employee Account</h3>
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
                        <Col lg="6">
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
                        <Col lg="6">
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
                            <div className="input-group">
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
                      </Row>
                    </div>
                    <div className="pl-lg-4">
                      <Row>
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
                              <option>Admin</option>
                            </Input>
                            <ErrorMessage
                              name="role"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <button
                              className="btn btn-primary"
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
