import "./Login.css";
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
  Row,
  Col,
} from "reactstrap";
import ForgotPasswordForm from "../ForgetPassword/ForgetPassword";

import Axios from '../../../Axios';
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

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
    
    axios.post("https://dummyjson.com/auth/login", {
      username: username,
      password: password
    })
      .then((response) => {
        if (response.data.message !== "Invalid credentials") {
          // Save the JWT in the client-side storage
          localStorage.setItem("jwt", response.data.token);
          // Redirect the user to the dashboard or homepage
          window.location.href = "/";
          console.log("Success: " + response.data);
        } else {
          // Display an error message to the user
          setShowErrorMessage(true);
          console.log("Invalid username or password");
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

  if (isForgotPassword) {
    return (
      <>
        <div className="login-page">
          <Col md={6} className="mx-auto">
            <Card className="login-card">
              <CardBody>
                <ForgotPasswordForm />
                <Row className="mt-3">
                  <Col xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <small style={{color:"gray"}} onClick={handleBackToLoginClick}>
                        Back to login
                      </small>
                    </a>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </div>
      </>
    );
  }

  return (
    <div className="login-page">
      <Col md={6} className="mx-auto">
        <Card className="login-card">
          <CardBody>
            <img
              src="https://creativelayers.net/themes/homez-html/images/header-logo2.svg"
              alt="logo"
              className="logoLogin mb-4"
            />
            <h1 className="text-center">Sign In</h1>
            <h5 className="text-center mb-4 text-gray">
              Happy to have you back!
            </h5>
            <Form role="form" onSubmit={handleSubmit}>
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
                    autoComplete="new-email"
                    id="username"
                    name="username"
                    value={username}
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
                  Invalid username or password
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
                {!isForgotPassword && (
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={handleForgotPasswordClick}
                  >
                    <small style={{color:"gray"}}>Forgot password?</small>
                  </a>
                )}
              </div>
              <div className="text-center">
                <Button
                  className="my-2 login-btn"
                  color="primary"
                  type="submit"
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}

export default Login;
