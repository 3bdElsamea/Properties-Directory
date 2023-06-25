import React, { useState, useEffect } from "react";
import { AxiosDashboard } from "../../../Axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Button,
  Form,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const empPermissions = localStorage.getItem("permissions");

const UpdateCountry = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [country, setContries] = useState({
    name: "",
  });

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await AxiosDashboard.patch(`/countries/${id}`, values);
      navigate("/dashboard/country");
    } catch (error) {
      console.log(error);
    }
  };

  const getCountryDetails = async () => {
    try {
      const response = await AxiosDashboard.get(`/countries/${id}`);
      const { name} = response.data;
      console.log(response.data);
      formik.setValues({ name});
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCountries = async () => {
    try {
      const response = await AxiosDashboard.get("/countries");
      setCountries(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountryDetails();
    getAllCountries();
  }, []);

  if (empPermissions.split(",").includes("country")) {
    return (
      <Container className="mt--6">
        <Row className="justify-content-center">
          <Col className="order-xl-1 ms-auto" xl="8">
            <Card className="bg-white shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center justify-content-center">
                  <Col xs="8">
                    <h3 className="mb-0">Update Country</h3>
                  </Col>
                  <Col className="text-right">
                    <Link to={"/dashboard/country"}>
                      <Button className="btn btn-danger btn-sm" type="button">
                        <i className="fa fa-arrow-left mr-2"> Back</i>
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={formik.handleSubmit}>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="city">
                            Country
                          </label>
                          <Input
                            id="city"
                            placeholder="Name"
                            name="name"
                            type="text"
                            {...formik.getFieldProps("name")}
                          />
                        </FormGroup>
                      </Col>
                     
                      <Col className="text-center" lg="12">
                        <button
                          type="submit"
                          className="btn btn-primary my-4 px-4 py-2"
                        >
                          Update
                        </button>
                      </Col>
                    </Row>
                  </div>
                </Form>
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

export default UpdateCountry ;
