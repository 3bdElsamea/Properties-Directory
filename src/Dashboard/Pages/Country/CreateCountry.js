import { useState, useEffect } from "react";
import { AxiosDashboard } from "../../../Axios";
import { Formik, Form, ErrorMessage } from "formik";
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

const CreateCountry = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

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
    name: Yup.string().required("Country is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    //if the fields is empty

    //Create an object of form data to submit
    try {
      const countryData = {
        name: values.name,
      };

      //Send form data to the API add blocked status
      await AxiosDashboard.post("/countries", countryData);
      navigate("/dashboard/countries");
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };



  return (
    <>
    <Container className="mt--6 w-75">
      <Row className="justify-content-center">
        <Col className="order-xl-1 ms-auto" xl="8">
          <Card className="bg-white shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center justify-content-center">
                <Col xs="8">
                  <h3 className="mb-0 text-center">Add Country</h3>
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
                   
                    <div className="pl-lg-4">
                      <Row className="mx-auto">
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="country"
                            >
                              Country
                            </label>
                            <Input
                              id="country"
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
                        <Col className="text-right" lg="12">
                          <button
                            type="submit"
                            className="btn btn-primary my-4"
                            onClick={handleSubmit}
                          >
                            Add
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
    </>

    
  );
};

export default CreateCountry;
