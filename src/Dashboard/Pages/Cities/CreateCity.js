import { useState, useEffect } from "react";
import { AxiosDashboard } from "../../../Axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const empPermissions = localStorage.getItem("permissions");

const CreateCountry = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  // Fetch countries from the JSON server
  useEffect(() => {
    AxiosDashboard.get("/countries")
      .then((response) => setCountries(response.data?.data))
      .catch((error) => console.log(error));
  }, []);

  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("City is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    //Create an object of form data to submit
    try {
      const cityData = {
        name: values.name,
        country_id: selectedCountry,
      };

      //Send form data to the API add blocked status
      console.log(cityData);
      await AxiosDashboard.post("/cities", cityData);
      navigate("dashboard/city");
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };

  if (empPermissions.split(",").includes("city")) {
    return (
      <Container className="mt--6">
        <Row className="justify-content-center">
          <Col className="order-xl-1 ms-auto" xl="8">
            <Card className="bg-white shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center justify-content-center">
                  <Col xs="8">
                    <h3 className="mb-0 text-center">Add City</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Formik
                  initialValues={initialValues}
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
                      <h6 className="heading-small text-muted mb-4">
                        Add Country
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="city"
                              >
                                City
                              </label>
                              <Input
                                id="city"
                                placeholder="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  touched.name && errors.name
                                    ? "is-invalid"
                                    : null
                                }
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="invalid-feedback"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="12">
                            <FormGroup>
                              <label className="form-control-label">
                                Country
                              </label>
                              <select
                                className="form-control"
                                name="country_id"
                                value={selectedCountry}
                                onChange={(e) =>
                                  setSelectedCountry(e.target.value)
                                }
                              >
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                  <option key={country.id} value={country.id}>
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                              <ErrorMessage
                                name="country"
                                component="div"
                                className="invalid-feedback"
                              />
                            </FormGroup>
                          </Col>
                          <Col className="text-center" lg="12">
                            <button
                              type="submit"
                              className="btn btn-primary my-4 px-4 py-2"
                              onClick={handleSubmit}
                            >
                              Save
                            </button>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  } else {
    window.location.href = "/ErrorPage";
  }
};

export default CreateCountry;
