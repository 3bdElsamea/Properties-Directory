import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Btn from "../../SharedUI/Btn/Btn";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import { AxiosDashboard } from '../../../Axios';

const CategoriesUpdate = () => {
 
    const { CategoryId } = useParams();
    const navigate = useNavigate();
    const [CategoryInfo, setCategoryInfo] = useState({
      id: "",
      name: "",
      active: "",
      
    });
    const validationSchema = Yup.object().shape({
      name: Yup.string()
        .required("Name is required")
        .matches(/^[a-zA-Z ]+$/, "Name should contain only letters and spaces"),
      active: Yup.string().required("Active status is required"),
    });
  
   // Formik form submission handler
   const formik = useFormik({
    initialValues: {
      name: "",
      active: ""
      
    },
    validationSchema,
    onSubmit: (values) => {
      const updatedCatageory = { ...values };

      // Filter out empty values
      const filteredValues = Object.keys(updatedCatageory).reduce((acc, key) => {
        if (updatedCatageory[key]) {
          acc[key] = updatedCatageory[key];
        }
        return acc;
      }, {});

      axios
        .patch(`/Categories/${CategoryId}}`, filteredValues)
        .then((res) => {
          console.log(res.data);
          navigate("/admin/Categories");
        })
        .catch((err) => console.log(err));
    },
  });


  useEffect(() => {
    axios.get(`/Categories/${CategoryId}`).then((res) => {
      const { name, active } = res.data;
      setCategoryInfo({ ...CategoryInfo, name, active });
      formik.setValues({ name, active });
    });
  }, [CategoryId]);

  const areAllFieldsEmpty = () => {
    const {  name, active } = formik.values;
    return !( name || active );
  };


  
    return (
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-white shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Update Category</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={formik.handleSubmit}>
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
                          <Input
                            className="form-control-alternative w-100"
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            id="name"
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
                      <Col lg="7">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-status">
                            active
                          </label>
                          <Input
                            type="select"
                            name="active"
                            id="active"
                            {...formik.getFieldProps("active")}
                          invalid={formik.touched.active && formik.errors.active}
                          >
                            <option value="">Select status</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </Input>
                          {formik.touched.active && formik.errors.active && (
                          <div className="invalid-feedback">
                            {formik.errors.active}
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
}

export default CategoriesUpdate
