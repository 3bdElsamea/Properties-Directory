import React from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Container, Row, Col } from "reactstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { AxiosDashboard } from '../../../Axios';
import { useNavigate } from "react-router-dom";

const OwnerAdd = () => {
  const navigate = useNavigate();

  

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required.")
      .matches(/^[a-zA-Z ]+$/, "Name should contain only letters and spaces."),
    slug: Yup.string()
      .required("Slug is required.")
      .matches(/^[a-zA-Z ]+$/, "Slug should contain only letters and spaces."),
    email: Yup.string().email("Invalid email.").required("Email is required."),
    phone: Yup.string()
      .required("Phone is required.")
      .matches(/^\+[0-9]{10,12}$/, "Phone number should be a valid number."),
    national_id: Yup.string()
      .required("National ID is required.")
      .matches(/^[0-9]{14}$/, "National ID must be a 14-digit number."),
    status: Yup.string().required("Status is required."),
  });
  const initialValues = {
    name: "",
    slug: "",
    email: "",
    phone: "",
    national_id: "",
    status: "",
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await AxiosDashboard.post("/owners", values);
      console.log(response.data.data);
      // TODO: Redirect to Home
      navigate("/dashboard/Owners");
    } catch (error) {
      console.log(error);
      // Handle error: show error message to the user or perform any other actions
    }
    setSubmitting(false);
  };

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1" xl="8">
          <Card className="bg-white shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Add New Owner</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form>
                    <h6 className="heading-small text-muted mb-4">Owner information</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-name">
                          Name
                        </label>
                        <Field
                          className="form-control-alternative w-100"
                          type="text"
                          name="name"
                          placeholder="Enter Name"

                        />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-slug">
                          Slug
                        </label>
                        <Field
                          className="form-control-alternative w-100"
                          type="text"
                          name="slug"
                          placeholder="Enter Slug"
                        />
                        <ErrorMessage name="slug" component="div" className="text-danger" />
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-email">
                          Email address
                        </label>
                        <Field
                          className="form-control-alternative w-100"
                          type="email"
                          name="email"
                          placeholder="Enter Email"
                        />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-phone">
                          Phone
                        </label>
                        <Field
                          className="form-control-alternative w-100"
                          type="tel"
                          name="phone"
                          placeholder="Enter Phone"
                        />
                        <ErrorMessage name="phone" component="div" className="text-danger" />
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-national-id">
                          National ID
                        </label>
                        <Field
                          className="form-control-alternative w-100"
                          type="text"
                          name="national_id"
                          placeholder="Enter National ID"
                        />
                        <ErrorMessage name="national_id" component="div" className="text-danger" />
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-status">
                          Status
                        </label>
                        <Field as="select" className="form-control" name="status">
                          <option value="">Select status</option>
                          <option value="active">Active</option>
                          <option value="rejected">Rejected</option>
                          <option value="pending">Pending</option>
                        </Field>
                        <ErrorMessage name="status" component="div" className="text-danger" />
                      </FormGroup>
                    </div>
                    <hr className="my-4" />
                    <Row>
                      <Col lg="12">
                        <Button variant="primary" color="primary" 
                        type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Adding..." : "Add"}
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
};

export default OwnerAdd;


















// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import {
//   CardBody,
//   FormGroup,
//   Input,
//   Col,
//   Row,
//   Card,
//   CardHeader,
//   Container,
//   Button,
// } from "reactstrap";
// import { AxiosDashboard } from "../../../Axios";

// const OwnerAdd = () => {
//   const navigate = useNavigate();

//   const validationSchema = Yup.object().shape({
//     name: Yup.string()
//       .required("Name is required.")
//       .matches(/^[a-zA-Z ]+$/, "Name should contain only letters and spaces."),
//     slug: Yup.string()
//       .required("Slug is required.")
//       .matches(/^[a-zA-Z ]+$/, "Slug should contain only letters and spaces."),
//     email: Yup.string().email("Invalid email.").required("Email is required."),
//     phone: Yup.string()
//       .required("Phone is required.")
//       .matches(/^\+[0-9]{10,12}$/, "Phone number should be a valid number."),
//     national_id: Yup.string()
//       .required("National ID is required.")
//       .matches(/^[0-9]{14}$/, "National ID must be a 14-digit number."),
//     status: Yup.string().required("Status is required."),
//   });

//   const initialValues = {
//     name: "",
//     slug: "",
//     email: "",
//     phone: "",
//     national_id: "",
//     status: "",
//   };

//   const handleSubmit = async (values) => {
//     try {
//       const response = await AxiosDashboard.post("/owners", values);
//       console.log(response.data);
//       navigate("/dashboard/Owners");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const formik = useFormik({
//     initialValues: initialValues,
//     validationSchema: validationSchema,
//     onSubmit: handleSubmit,
//   });

//   return (
//     <Container className="mt--7">
//       <Row className="justify-content-center">
//         <Col className="order-xl-1 ms-auto" xl="8">
//           <Card className="bg-white shadow">
//             <CardHeader className="bg-white border-0">
//               <Row className="align-items-center justify-content-center">
//                 <Col xs="8">
//                   <h3 className="mb-0 text-center">Add New Owner</h3>
//                 </Col>
//               </Row>
//             </CardHeader>
//             <CardBody>
//               <form onSubmit={formik.handleSubmit}>
//                 <h6 className="heading-small text-muted mb-4">
//                   Owner Information
//                 </h6>
//                 <div className="pl-lg-4">
//                   <Row>
//                     <Col lg="6">
//                       <FormGroup>
//                         <label className="form-control-label" htmlFor="name">
//                           Name
//                         </label>
//                         <Input
//                           id="name"
//                           name="name"
//                           placeholder="Enter Name"
//                           type="text"
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           value={formik.values.name}
//                           className={
//                             formik.touched.name && formik.errors.name
//                               ? "is-invalid"
//                               : ""
//                           }
//                         />
//                         {formik.touched.name && formik.errors.name && (
//                           <div className="invalid-feedback">
//                             {formik.errors.name}
//                           </div>
//                         )}
//                       </FormGroup>
//                     </Col>
//                     <Col lg="6">
//                       <FormGroup>
//                         <label className="form-control-label" htmlFor="slug">
//                           Slug
//                         </label>
//                         <Input
//                           id="slug"
//                           name="slug"
//                           placeholder="Enter Slug"
//                           type="text"
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           value={formik.values.slug}
//                           className={
//                             formik.touched.slug && formik.errors.slug
//                               ? "is-invalid"
//                               : ""
//                           }
//                         />
//                         {formik.touched.slug && formik.errors.slug && (
//                           <div className="invalid-feedback">
//                             {formik.errors.slug}
//                           </div>
//                         )}
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col lg="6">
//                       <FormGroup>
//                         <label className="form-control-label" htmlFor="email">
//                           Email
//                         </label>
//                         <Input
//                           id="email"
//                           name="email"
//                           placeholder="Enter Email"
//                           type="email"
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           value={formik.values.email}
//                           className={
//                             formik.touched.email && formik.errors.email
//                               ? "is-invalid"
//                               : ""
//                           }
//                         />
//                         {formik.touched.email && formik.errors.email && (
//                           <div className="invalid-feedback">
//                             {formik.errors.email}
//                           </div>
//                         )}
//                       </FormGroup>
//                     </Col>
//                     <Col lg="6">
//                       <FormGroup>
//                         <label className="form-control-label" htmlFor="phone">
//                           Phone
//                         </label>
//                         <Input
//                           id="phone"
//                           name="phone"
//                           placeholder="Enter Phone"
//                           type="text"
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           value={formik.values.phone}
//                           className={
//                             formik.touched.phone && formik.errors.phone
//                               ? "is-invalid"
//                               : ""
//                           }
//                         />
//                         {formik.touched.phone && formik.errors.phone && (
//                           <div className="invalid-feedback">
//                             {formik.errors.phone}
//                           </div>
//                         )}
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col lg="6">
//                       <FormGroup>
//                         <label
//                           className="form-control-label"
//                           htmlFor="national_id"
//                         >
//                           National ID
//                         </label>
//                         <Input
//                           id="national_id"
//                           name="national_id"
//                           placeholder="Enter National ID"
//                           type="text"
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           value={formik.values.national_id}
//                           className={
//                             formik.touched.national_id &&
//                             formik.errors.national_id
//                               ? "is-invalid"
//                               : ""
//                           }
//                         />
//                         {formik.touched.national_id &&
//                           formik.errors.national_id && (
//                             <div className="invalid-feedback">
//                               {formik.errors.national_id}
//                             </div>
//                           )}
//                       </FormGroup>
//                     </Col>
//                     <Col lg="6">
//                       <FormGroup>
//                         <label className="form-control-label" htmlFor="status">
//                           Status
//                         </label>
//                         <Input
//                           id="status"
//                           name="status"
//                           placeholder="Enter Status"
//                           type="text"
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           value={formik.values.status}
//                           className={
//                             formik.touched.status && formik.errors.status
//                               ? "is-invalid"
//                               : ""
//                           }
//                         />
//                         {formik.touched.status && formik.errors.status && (
//                           <div className="invalid-feedback">
//                             {formik.errors.status}
//                           </div>
//                         )}
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                 </div>
//                 <div className="pl-lg-4">
//                   <Row>
//                     <Col lg="12">
//                       <FormGroup>
//                         <Button
//                           className="btn btn-primary"
//                           type="submit"
//                           disabled={formik.isSubmitting}
//                         >
//                           Save
//                         </Button>
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                 </div>
//               </form>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default OwnerAdd;











