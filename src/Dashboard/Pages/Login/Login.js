import React, { useState } from "react";
import { Navigate } from "react-router-dom";
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
  Row,
  Col,
} from "reactstrap";

import { AxiosDashboard } from '../../../Axios';


import ForgotPasswordForm from "../ForgetPassword/ForgetPassword";

function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const jwt = localStorage.getItem("jwt");

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    setShowErrorMessage(false); // Reset error message when username changes
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setShowErrorMessage(false); // Reset error message when password changes
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    AxiosDashboard.post("/auth/login", {
      email: email,
      password: password
    })
      .then((response) => {
        const { data } = response;
        if (data.message !== "Invalid credentials") {
          // Save the JWT in the client-side storage
          localStorage.setItem("jwt", data.token);
          // Redirect the user to the dashboard or homepage
          window.location.href = "/dashboard/index";
          console.log("Success: " + data);
        } else {
          // Display an error message to the user
          setShowErrorMessage(true);
          console.log("Invalid email or password");
        }
      })
      .catch((error) => {
        // Display an error message to the user
        setShowErrorMessage(true);
        console.log("Error: " + error);
      });
  }
  

  function handleForgotPasswordClick() {
    setIsForgotPassword(true);
  }

  function handleBackToLoginClick() {
    setIsForgotPassword(false);
  }

  if (!jwt) {
    if (isForgotPassword) {
      return (
        <>
          <Col lg="5" md="7">
            <Card className="shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Reset Password</small>
                </div>
                <ForgotPasswordForm />
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small onClick={handleBackToLoginClick}>Back to login</small>
                </a>
              </Col>
            </Row>
          </Col>
        </>
      );
    }

    return (
      <>
        <Col lg="5" md="7">
          <Card className="shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in</small>
              </div>
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-circle-08" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="email"
                      type="text"
                      autoComplete="new-email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleUsernameChange}
                    />
                  </InputGroup>
                </FormGroup>
                {!isForgotPassword && (
                  <FormGroup>
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
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </InputGroup>
                  </FormGroup>
                )}
                {showErrorMessage && (
                  <span style={{ color: "red", fontSize: 12 }}>
                    Invalid email or password
                  </span>
                )}
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                </div>
                <div className="text-center">
                  {!isForgotPassword ? (
                    <Button className="my-2" color="primary" type="submit">
                      Sign in
                    </Button>
                  ) : (
                    <Button
                      className="my-2"
                      color="primary"
                      onClick={handleForgotPasswordClick}
                    >
                      Reset Password
                    </Button>
                  )}
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              {!isForgotPassword && (
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={handleForgotPasswordClick}
                >
                  <small>Forgot password?</small>
                </a>
              )}
            </Col>
          </Row>
        </Col>
      </>
    );
  } else {
    return <Navigate to="/dashboard/index" replace />;
  }
}

export default Login;
