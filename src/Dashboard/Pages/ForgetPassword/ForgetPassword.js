import React, { useState } from 'react';
import { AxiosDashboard } from '../../../Axios';
import { Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: email
    };
    const config = {
      headers: {
        'email': email, // Add the email as a custom header
        'Content-Type': 'application/json'
      }
    };
    AxiosDashboard.post('/auth/forget-password', data, config)
      .then(res => {
        console.log(res);
        setIsSubmitted(true);
      })
      .catch(err => {
        console.log(err);
        setError("There is no account for this email!");
      });
  };

  return (
    <>
      {isSubmitted ? (
        <Alert color="success" className="mt-3">
          Password reset email sent. Please check your email for further instructions.
        </Alert>
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <Button color="primary" block>Send Reset Code</Button>
          {error && (
            <Alert color="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Form>
      )}
    </>
  );
  
};

export default ForgotPasswordForm;