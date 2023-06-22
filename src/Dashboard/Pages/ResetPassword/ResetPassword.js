import React, { useState } from 'react';
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
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { AxiosDashboard } from "../../../Axios";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required."),
});

const ResetPasswordPage = () => {
  const { id } = useParams();
  const [error, setError] = useState('');
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

  const handleSubmit = (values) => {
    const { password, confirmPassword } = values;

    const data = {
      token: id,
      password: password,
      password_confirmation: confirmPassword
    };

    AxiosDashboard.post('/auth/reset-password', data)
      .then(res => {
        console.log(res);
        setPasswordResetSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setError("There is no account for this email!");
      });
  };

  return (
    <div>
      <Col md={6} className="ml-5">
        <Card className="login-card">
          <CardBody>
            <h1 className="text-center">Reset Password</h1>
            {!passwordResetSuccess ? (
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
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
                    <FormGroup controlid="confirmPassword">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Confirm New Password"
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.confirmPassword &&
                            touched.confirmPassword &&
                            "is-invalid"
                          }
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </FormGroup>
                    {!passwordResetSuccess && (
                      <div className="text-center">
                        <Button className="my-2" color="primary" type="submit">
                          Reset Password
                        </Button>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            ) : (
              <div>
                <p className="text-center">Password updated successfully!</p>
                {/* Add any additional success message or styling here */}
              </div>
            )}
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default ResetPasswordPage;
