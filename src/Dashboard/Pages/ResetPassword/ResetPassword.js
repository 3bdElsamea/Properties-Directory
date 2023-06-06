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
import { AxiosDashboard } from "../../../Axios";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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
      axios.patch(`https://dummyjson.com/users/1`, { password })
      //Axios.patch(`/users/1`, { password })
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
      window.location.href = "/auth/login";
    }, 3000);
  }

  return (
    <div>
      <Col md={6} className="ml-5">
        <Card className="login-card">
          <CardBody>
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
                <div className="text-center">
                  <Button className="my-2" color="primary" type="submit">
                    Reset Password
                  </Button>
                </div>
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
