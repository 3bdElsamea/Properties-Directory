import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import { AxiosWeb } from "../../../Axios";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "react-bootstrap-sweetalert";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  username: Yup.string().required("Username is required."),
  email: Yup.string().email("Invalid email.").required("Email is required."),
  phone: Yup.string()
    .matches(/^(?:[0-9] ?){6,14}[0-9]$/, "Invalid phone number.")
    .required("Phone is required."),
  password: Yup.string()
    .required("Password is required.")
    .test(
      "password-strength",
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
    ),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required."),
});

function Register() {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showErrorValidation, setErrorValidation] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(values) {
    AxiosWeb.post("/auth/register", values)
      .then((response) => {
        console.log("Registration successful: " + response.data);
        setShowSuccessAlert(true);
        setShowErrorMessage(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          //console.log(error.response.data.error.errors[0].message);
          setErrorValidation(error.response.data.error.errors[0].message);
        } else {
          console.log("Error: " + error);
          setErrorValidation("An error occurred during registration, Email and Phone must be unique");
        }
        setShowErrorMessage(true);
        setShowSuccessAlert(false);
      });
  }  

  function handleSuccessAlertConfirm() {
    navigate("/login");
  }

  return (
    <div className="register-page">
      <Col md={6} className="mx-auto">
        <Card className="register-card">
          <CardBody>
            <a href="/home">
              <img
                src="https://creativelayers.net/themes/homez-html/images/header-logo2.svg"
                alt="logo"
                className="logoLogin mb-4"
              />
            </a>
            <h1 className="text-center titleAuth">Register</h1>
            <h5 className="text-center mb-4 text-gray">Create a new account</h5>
            <Formik
              initialValues={{
                name: "",
                username: "",
                email: "",
                phone: "",
                password: "",
                password_confirmation: "",
              }}
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
              }) => (
                <Form role="form" onSubmit={handleSubmit}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Name"
                        type="text"
                        autoComplete="new-name"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.name && errors.name ? "is-invalid" : ""}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-circle-08" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Username"
                        type="text"
                        autoComplete="new-username"
                        id="username"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          touched.username && errors.username ? "is-invalid" : ""
                        }
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        autoComplete="new-email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.email && errors.email ? "is-invalid" : ""}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-mobile-button" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Phone"
                        type="text"
                        autoComplete="new-phone"
                        id="phone"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.phone && errors.phone ? "is-invalid" : ""}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="new-password"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          touched.password && errors.password ? "is-invalid" : ""
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        autoComplete="new-password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={values.password_confirmation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          touched.password_confirmation &&
                          errors.password_confirmation
                            ? "is-invalid"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="password_confirmation"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </FormGroup>
                  {showErrorMessage && (
                    <Swal
                      danger
                      showCancelButton={false}
                      showConfirmButton
                      focusConfirmBtn
                      confirmBtnText="OK"
                      confirmBtnBsStyle="success"
                      title="Error"
                      icon="error"
                      onConfirm={() => setShowErrorMessage(false)}
                    >
                      <p>{showErrorValidation}</p>
                    </Swal>
                  )}
                  {showSuccessAlert && (
                    <Swal
                      success
                      showCancelButton={false}
                      showConfirmButton
                      focusConfirmBtn
                      confirmBtnText="OK"
                      confirmBtnBsStyle="success"
                      title="Success"
                      onConfirm={handleSuccessAlertConfirm}
                    >
                      <p>Registration successful!</p>
                    </Swal>
                  )}
                  <div className="text-center">
                    <Button
                      className="mt-4"
                      color="primary"
                      type="submit"
                      //disabled={isSubmitting}
                    >
                      Create account
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}

export default Register;
