import "../Login/Login.css";
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

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  function handleNameChange(event) {
    setName(event.target.value);
    setShowErrorMessage(false); // Reset error message when name changes
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    setShowErrorMessage(false); // Reset error message when username changes
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setShowErrorMessage(false); // Reset error message when password changes
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
    setShowErrorMessage(false); // Reset error message when confirm password changes
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setShowErrorMessage(false); // Reset error message when email changes
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
    setShowErrorMessage(false); // Reset error message when phone number changes
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setShowErrorMessage(true);
      return; // Exit the function if passwords don't match
    }

    AxiosWeb.post("/auth/register", {
      name: name,
      username: username,
      password: password,
      password_confirmation: confirmPassword,
      email: email,
      phone: phone,
    })
      .then((response) => {
        // Handle the response accordingly (e.g., show success message, redirect to login page)
        console.log("Registration successful: " + response.data);
        window.location.href='/login';
      })
      .catch((error) => {
        // Display an error message to the user
        setShowErrorMessage(true);
        console.log("Error: " + error);
      });
  }

  return (
    <div className="register-page">
      <Col md={6} className="mx-auto">
        <Card className="register-card">
          <CardBody>
            <img
              src="https://creativelayers.net/themes/homez-html/images/header-logo2.svg"
              alt="logo"
              className="logoLogin mb-4"
            />
            <h1 className="text-center titleAuth">Register</h1>
            <h5 className="text-center mb-4 text-gray">Create a new account</h5>
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
                    value={name}
                    onChange={handleNameChange}
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
                    value={username}
                    onChange={handleUsernameChange}
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
                    value={email}
                    onChange={handleEmailChange}
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
                    type="tel"
                    autoComplete="new-phone"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </InputGroup>
              </FormGroup>
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
              <FormGroup>
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
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </InputGroup>
              </FormGroup>
              {showErrorMessage && (
                <span style={{ color: "red", fontSize: 12 }}>
                  Registration failed
                </span>
              )}
              <div className="text-center">
                <Button className="my-2 register-btn" color="primary" type="submit">
                  Register
                </Button>
                <p style={{ display: "inline" }}>Already have an account? </p>
                <a href="/login">Sign In</a>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}

export default Register;
