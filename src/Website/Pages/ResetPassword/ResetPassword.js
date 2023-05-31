import React, { useState, useEffect } from "react";
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
import "../Login/Login.css";
import Axios from "../../../Axios";
import { v4 as uuidv4 } from "uuid";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  //const jwt = localStorage.getItem('jwt');
  //const parts = jwt.split('.');
  //const encodedPayload = parts[1];
  //const payload = JSON.parse(atob(encodedPayload));
  //const id = payload.id;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a new random token
    const password_token = uuidv4();

    // Add your password reset logic here
    if (password === confirmPassword) {
      const headers = {
        Authorization: "Bearer " + password_token, // Add the password_token to the Authorization header
      };
      // Passwords match, proceed with password reset
      //axios.patch(`/users/${id}`, { password })
      Axios.patch(`/users/1`, { password })
        .then(() => {
          console.log("Password updated successfully");
          setPasswordResetSuccess(true);
        })
        .catch((error) => {
          console.log("Password update error:", error);
        });
    } else {
      // Passwords don't match, set passwordsMatch state to false
      setPasswordsMatch(false);
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
            <img
              src="https://creativelayers.net/themes/homez-html/images/header-logo2.svg"
              alt="logo"
              className="logoLogin mb-4"
            />
            <h1 className="text-center">Reset Password</h1>
            {!passwordResetSuccess ? (
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
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup controlid="confirmPassword">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirm New Password"
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                {!passwordsMatch && (
                  <span className="text-danger">Passwords do not match!</span>
                )}
                <Button type="submit" className="login-btn">
                  Reset Password
                </Button>
              </Form>
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
