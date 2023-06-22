import React, { useState } from "react";
import { useParams } from 'react-router-dom';
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
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { AxiosWeb } from "../../../Axios";


const validationSchema = Yup.object().shape({
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

const ResetPasswordPage = () => {
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const { id } = useParams();

  const handleSubmit = (values) => {
    const { password, password_confirmation } = values;
    // Generate a new random token
    //const password_token = uuidv4();
    const data = {
      token: id,
      password: password,
      password_confirmation: password_confirmation
    };

    // Add your password reset logic here
    if (values.password === values.password_confirmation) {
      /*const headers = {
        Authorization: "Bearer " + password_token, // Add the password_token to the Authorization header
      };*/

      AxiosWeb.post('/auth/reset-password', data)
      .then(res => {
        console.log(res);
        setPasswordResetSuccess(true);
      })
      .catch(err => {
        console.log(err);
      });
    }
  };

  if (passwordResetSuccess) {
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  }

  return (
    <div className="login-page">
      <Col md={6} className="mx-auto">
        <Card className="login-card">
          <CardBody>
            <h1 className="text-center">Reset Password</h1>
            {!passwordResetSuccess ? (
              <Formik
                initialValues={{
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
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup controlid="password">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="New Password"
                          type="password"
                          id="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.password &&
                            touched.password &&
                            "is-invalid"
                          }
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="password_confirmation">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Confirm New Password"
                          type="password"
                          id="password_confirmation"
                          name="password_confirmation"
                          value={values.password_confirmation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.password_confirmation &&
                            touched.password_confirmation &&
                            "is-invalid"
                          }
                        />
                        <ErrorMessage
                          name="password_confirmation"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button className="my-4" color="primary" type="submit">
                        Reset Password
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              <div className="text-center">
                <p>Password reset successful. Redirecting to login page...</p>
              </div>
            )}
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default ResetPasswordPage;
