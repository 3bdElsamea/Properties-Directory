import React from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AxiosDashboard } from '../../../Axios';
const CategoriesAdd = () => {

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[a-zA-Z ]+$/, "Name should contain only letters and spaces"),
    active: Yup.string().required("Active status is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await AxiosDashboard.post('/Categories', values);
      console.log(response.data);
      // TODO: Redirect to Home
      window.location.href = '/dashboard/Categories';
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1" xl="8">
          <Card className=" shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Add New Category</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Formik
                initialValues={{
                  name: "",
                  active: "",
                  created_at: ""
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, isSubmitting }) => (
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Category information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-name">
                              Name
                            </label>
                            <Field
                              className="form-control-alternative w-100"
                              type="text"
                              placeholder="Enter Name"
                              name="name"
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-danger"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="7">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-national-id">
                              Active
                            </label>
                            <Field
                              as="select"
                              className="form-control"
                              name="active"
                            >
                              <option value="">Select</option>
                              <option value="true">Active</option>
                              <option value="false">Inactive</option>
                            </Field>
                            <ErrorMessage
                              name="active"
                              component="div"
                              className="text-danger"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                    <hr className="my-4" />

                    <Row>
                      <Col lg="12">
                        <Button
                          variant="primary"
                          color="primary"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Adding...' : 'Add'}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CategoriesAdd;
