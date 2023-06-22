import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
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
import { AxiosDashboard } from "../../../Axios";

const empPermissions = localStorage.getItem("permissions");

const PropertyImages = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    image: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("image", values.image);

      const response = await AxiosDashboard.post(
        `/property-images/${propertyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.data);
      // TODO: Redirect to Home
      navigate(`/dashboard/properties/details/${propertyId}`);
    } catch (error) {
      console.log(error);
      // Handle error: show error message to the user or perform any other actions
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      image: null,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  if (empPermissions.includes("property")) {
    return (
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-white shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add New Image </h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={formik.handleSubmit}>
                  <FormGroup>
                    <Input
                      type="file"
                      name="image"
                      id="image"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "image",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.image && formik.errors.image}
                    />
                    {formik.touched.image && formik.errors.image && (
                      <div className="invalid-feedback">
                        {formik.errors.image}
                      </div>
                    )}
                  </FormGroup>
                  <Button
                    color="danger"
                    className="btn"
                    onClick={formik.handleSubmit}
                    type="button"
                  >
                    Add
                  </Button>
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

export default PropertyImages;
