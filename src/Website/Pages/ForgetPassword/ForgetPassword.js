import React, { useState } from "react";
import {
  Button,
  Input,
  Form,
  InputGroupText,
  InputGroupAddon,
  InputGroup,
  FormGroup,
  Alert
} from "reactstrap";

import { AxiosWeb } from "../../../Axios";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitted(true);
      await AxiosWeb.post("/auth/forget-password", { email });
      setIsEmailExist(true)
    } catch (error) {
      // Handle network errors
      console.log("Network Error: " + error);
      if (error.code === "ERR_BAD_REQUEST") {
        setIsEmailExist(false)
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    //setIsEmailExist(true); // Reset the email existence status when the email changes
  };

  return (
    <div>
      {isEmailExist && isSubmitted ? (
        <p>
          An email with instructions to reset your password has been sent to{" "}
          {email}.
        </p>
      ) : (
        <Form role="form" onSubmit={handleSubmit}>
          <div className="text-center text-muted mb-4">
            <a href="/home">
              <img
                src="https://creativelayers.net/themes/homez-html/images/header-logo2.svg"
                alt="logo"
                className="mb-4"
              />
            </a>
            <h1>Reset Password</h1>
          </div>
          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-envelope" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email Address"
                required
              />
              
            </InputGroup>
          </FormGroup>
          {!isEmailExist && (
                <Alert color="danger" className="mt-3">
                  There's no account for this email
              </Alert>
              )}
          <div className="text-center">
            <Button className="login-btn my-2" color="primary" type="submit">
              Reset Password
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
