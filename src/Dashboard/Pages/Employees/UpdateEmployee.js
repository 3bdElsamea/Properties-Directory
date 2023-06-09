import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosDashboard } from "../../../Axios";
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
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

const empPermissions = localStorage.getItem("permissions");

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    try {
      const response = await AxiosDashboard.get(`/roles`);
      setRoles(response.data?.roles.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    image: "",
    role_id: "",
    blocked: false,
  });

  // Formik validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z ]+$/, "Name should contain only letters and spaces.")
      .min(3, "Name must be at least 3 characters."),
    email: Yup.string().email("Invalid email.").required("Email is required."),

    phone: Yup.string().matches(
      /^\d+$/,
      "Phone number must be numeric."
    ),

      
    password: Yup.string()
      .min(8, "Password must be at least 8 characters.")
      .max(20, "Password must not exceed 20 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must be at least one lowercase, one uppercase, one number and one special character"
      ),

    image: Yup.string(),
    role: Yup.string().required("Role is required."),
  });

  // Formik form submission handler
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      image: "",
      role_id: "",
    },
    validationSchema,

    onSubmit: (values) => {
      const updatedEmployee = { ...values};

      // Filter out empty values
      const filteredValues = Object.keys(updatedEmployee).reduce((acc, key) => {
        if (updatedEmployee[key]) {
          acc[key] = updatedEmployee[key];
        }
        return acc;
      }, {});
      delete filteredValues.role;

      AxiosDashboard.patch(`/employees/${id}`, filteredValues)
        .then((res) => {
          console.log(res.data);
          navigate("/dashboard/employees");
        })
        .catch((err) => console.log(err));
    },
  });

  // Fetch employee data from API on component mount
  useEffect(() => {
    AxiosDashboard.get(`/employees/${id}`).then((res) => {
      const { name, email, phone, image, role_id} = res.data;
      setEmployee({ ...employee, name, email, phone, image, role_id});
      formik.setValues({ name, email, phone, role_id });
    });
    getRoles();
  }, [id, areAllFieldsEmpty]);

  const areAllFieldsEmpty = () => {
    const { name, email, phone, password, role } = formik.values;
    return !(name || email || phone || password || role);
  };

  if (empPermissions.split(",").includes("employee")) {
    return (
      <Container className="mt--5">
        <Row className="justify-content-center">
          <Col lg="8">
            <Card className="shadow-lg">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center justify-content-center">
                  <Col xs="8">
                    <h3 className="mb-0">Update Account</h3>
                  </Col>
                  <Col className="text-right">
                    <Link to={"/dashboard/employees"}>
                      <Button className="btn btn-danger btn-sm" type="button">
                        <i className="fa fa-arrow-left mr-2"> Back</i>
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-3">
                <Form onSubmit={formik.handleSubmit}>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="name">
                      Name
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="name"
                      type="text"
                      placeholder="Enter name"
                      {...formik.getFieldProps("name")}
                      invalid={formik.touched.name && formik.errors.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="invalid-feedback">
                        {formik.errors.name}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="email">
                      Email
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      {...formik.getFieldProps("email")}
                      invalid={formik.touched.email && formik.errors.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="phone">
                      Phone
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="phone"
                      type="tel"
                      placeholder="Enter phone"
                      {...formik.getFieldProps("phone")}
                      invalid={formik.touched.phone && formik.errors.phone}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="invalid-feedback">
                        {formik.errors.phone}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="password">
                      Password
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="password"
                      type="password"
                      placeholder="Enter password (optional)"
                      {...formik.getFieldProps("password")}
                      invalid={
                        formik.touched.password && formik.errors.password
                      }
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback">
                        {formik.errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="role">
                      Role
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="role"
                      type="select"                      
                      {...formik.getFieldProps("role")}
                      invalid={formik.touched?.role && formik.errors.role}
                    >
                      <option value="" disabled>Select a role</option>
                      {roles?.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                      
                    </Input>
                    {formik.touched?.role && formik.errors.role && (
                      <div className="invalid-feedback">
                        {formik.errors.role}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Col lg="12 text-center mt-3">
                      <button
                        className="btn-danger btn"
                        onClick={formik.handleSubmit}
                        type="submit"
                        disabled={areAllFieldsEmpty}
                      >
                        Update
                      </button>
                    </Col>
                  </FormGroup>
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

export default UpdateEmployee;
