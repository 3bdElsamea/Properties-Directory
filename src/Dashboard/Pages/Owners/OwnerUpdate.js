import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CardBody,
  FormGroup,
  Form,
  Input,
  Col,
  Row,
  Card,
  CardHeader,
  Container,
} from "reactstrap";
import Btn from "../../SharedUI/Btn/Btn";
import { AxiosDashboard } from '../../../Axios';

const OwnerUpdate = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const [ownerInfo, setOwnerInfo] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    image: "",
    national_id: "",
    status: "",
    created_at: "",
  });
  
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required.")
      .matches(/^[a-zA-Z ]+$/, "Name should contain only letters and spaces."),
    email: Yup.string().email("Invalid email.").required("Email is required."),

    phone: Yup.string()
      .required("Phone is required.")
      .matches(/^\+[0-9]{10,12}$/, "Phone number should be valid number."),
    national_id: Yup.string()
      .required("National ID is required")
      .matches(/^[0-9]{14}$/, "National ID must be a 14-digit number"),
    status: Yup.string().required("Status is required"),
  });
  // Formik form submission handler
  const formik = useFormik({
    initialValues: {
      name: "",
      slug:"",
      email: "",
      phone: "",
      national_id: "",
      status: "",
    },
    validationSchema,

    onSubmit: (values) => {
      const updatedOwner = { ...values };

      // Filter out empty values
      const filteredValues = Object.keys(updatedOwner).reduce((acc, key) => {
        if (updatedOwner[key]) {
          acc[key] = updatedOwner[key];
        }
        return acc;
      }, {});

      AxiosDashboard
        .patch(`/owners/${ownerId}`, filteredValues)
        .then((res) => {
          console.log(res.data.data);
          navigate("/dashboard/Owners");
        })
        .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    AxiosDashboard.get(`/owners/${ownerId}`).then((res) => {
      const { name,slug, email, phone, national_id, status } = res.data;
      setOwnerInfo({ ...ownerInfo, name,slug, email, phone, national_id, status });
      formik.setValues({ name,slug, email, phone,  national_id, status });
    });
  }, [ownerId,areAllFieldsEmpty]);

  const areAllFieldsEmpty = () => {
    const { name, slug,email, phone,national_id, status } = formik.values;
    return !(name || slug ||email || phone || national_id || status);
  };

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1" xl="8">
          <Card className="bg-white shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Update Owner</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={formik.handleSubmit}>
                <h6 className="heading-small text-muted mb-4">
                  Owner information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-name">
                          Name
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          id="name"
                          type="text"
                          placeholder="Enter Name"
                          name="name"
                          {...formik.getFieldProps("name")}
                          invalid={formik.touched.name && formik.errors.name}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div className="invalid-feedback">{formik.errors.name}</div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-name">
                          Slug
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          id="slug"
                          type="text"
                          placeholder="Enter slug"
                          name="slug"
                          {...formik.getFieldProps("slug")}
                          invalid={formik.touched.slug && formik.errors.slug}
                        />
                        {formik.touched.slug && formik.errors.slug && (
                          <div className="invalid-feedback">{formik.errors.slug}</div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-email">
                          Email address
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          id="email"
                          {...formik.getFieldProps("email")}
                          invalid={formik.touched.email && formik.errors.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="invalid-feedback">
                            {formik.errors.email}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-phone">
                          Phone
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="tel"
                          placeholder="Enter Phone"
                          name="phone"
                          id="phone"
                          {...formik.getFieldProps("phone")}
                          invalid={formik.touched.phone && formik.errors.phone}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                          <div className="invalid-feedback">
                            {formik.errors.phone}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-national-id">
                          National ID
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter National ID"
                          name="national_id"
                          id="national_id"
                          {...formik.getFieldProps("national_id")}
                          invalid={formik.touched.national_id && formik.errors.national_id}
                        />
                        {formik.touched.national_id && formik.errors.national_id && (
                          <div className="invalid-feedback">
                            {formik.errors.national_id}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="7">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-status">
                          Status
                        </label>
                        <Input
                          type="select"
                          name="status"
                          id="status"
                          {...formik.getFieldProps("status")}
                          invalid={formik.touched.status && formik.errors.status}
                        >
                          <option value="">Select status</option>
                          <option value="active">active</option>
                          <option value="rejected">rejected</option>
                          <option value="pending">pending</option>
                        </Input>
                        {formik.touched.status && formik.errors.status && (
                          <div className="invalid-feedback">
                            {formik.errors.status}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                
                </div>
                <hr className="my-4" />
                <Row>
                  <Col lg="12">
                  <Btn
                    title="Update"
                    name="btn-danger btn"
                    onClick={formik.handleSubmit}
                    type="button"
                    disabled={areAllFieldsEmpty}
                  />
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OwnerUpdate;
