import React, { useState } from "react";
import {
  Button,
  Input,
  Form,
  InputGroupText,
  InputGroupAddon,
  InputGroup,
  FormGroup,
} from "reactstrap";
import Axios from "../../../Axios";
import axios from "axios";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("https://dummyjson.com/users");

      if (response.status === 200) {
        const { users } = response.data;
        const emails = users.map((user) => user.email);

        if (emails.includes(email)) {
          //const resetResponse = await Axios.post('/api/forgot-password', { email });

          //if (resetResponse.status === 200) {
          setIsSubmitted(true);
          //} else {
          // Handle error response from the server
          //}
          console.log("valid");
        } else {
          console.log("not valid");
          setEmail("");
          setIsValidEmail(false);
        }
      } else {
        // Handle error response from the server
        console.log("Server Error");
      }
    } catch (error) {
      // Handle network errors
      console.log("Network Error: " + error);
    }
  };

  const handleEmailChange = (e) => {
    console.log("handle");
    setEmail(e.target.value);
    setIsValidEmail(true);
  };

  return (
    <div>
      {isSubmitted ? (
        <p>
          An email with instructions to reset your password has been sent to{" "}
          {email}.
        </p>
      ) : (
        <Form role="form" onSubmit={handleSubmit}>
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
              {!isValidEmail && (
                <span
                  style={{
                    color: "red",
                    fontSize: 12,
                    backgroundColor: "white",
                  }}
                >
                  There's no account for this email
                </span>
              )}
            </InputGroup>
          </FormGroup>

          <div className="text-center">
            <Button className="my-2" color="primary" type="submit">
              Reset Password
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
