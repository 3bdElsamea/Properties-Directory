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


const PropertyUpdate = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [propertyInfo, setPropertyInfo] = useState({
    "title": "",
    "slug": "",
    "description": " ",
    "price": "",
    "image": "",
    "area": "",
    "bathrooms": "",
    "bedrooms": "",
    "garage": "",
    "floors": "",
    "year_built": "",
    "status": "",
    "category_id": "",
    "city_id": "",
    "owner_id": "",
    "employee_id": "",
  
  });
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    slug: Yup.string().required("Slug is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    area: Yup.number().required(" is required"),
    bathrooms: Yup.number().required(" is required"),
    bedrooms: Yup.number().required(" is required"),
    garage: Yup.number().required(" is required"),
    floors: Yup.number().required(" is required"),
    year_built: Yup.number().required(" is required"),
    status: Yup.string().required(" is required"),
    city_id: Yup.number().required(" is required"),
    owner_id: Yup.number().required(" is required"),
    employee_id: Yup.number().required(" is required"),

    // Add validation rules for other fields
  });

  const formik = useFormik({
    initialValues: {
      "title": "",
      "slug": "",
      "description": " ",
      "price": "",
      // "image": "",
      "area": "",
      "bathrooms": "",
      "bedrooms": "",
      "garage": "",
      "floors": "",
      "year_built": "",
      "status": "",
      "category_id": "",
      "city_id": "",
      "owner_id": "",
      "employee_id": "",
   
    },
    validationSchema,
 
 
    onSubmit: () => {
      const filteredValues = { ...formik.values };
      delete filteredValues.image;

      AxiosDashboard.patch(`/properties/${propertyId}`, filteredValues)
        .then((res) => {
          console.log(res.data);
          navigate("/dashboard/properties");
        })
        .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    AxiosDashboard.get(`/properties/${propertyId}`)
      .then((res) => {
        const { title, slug, description, price, image, area, bathrooms, bedrooms, garage, floors, year_built, status, category_id, city_id, owner_id, employee_id } = res.data;
        setPropertyInfo({ ...propertyInfo, title, slug, description, price, image, area, bathrooms, bedrooms, garage, floors, year_built, status, category_id, city_id, owner_id, employee_id });
        formik.setValues({ title, slug, description, price, image, area, bathrooms, bedrooms, garage, floors, year_built, status, category_id, city_id, owner_id, employee_id });
      })
      .catch((err) => console.log(err));
  }, [propertyId]);


// const areAllFieldsEmpty = () => {
//   const { title, slug,description, price,area, bathrooms,bedrooms,garage,floors,year_built,status
//             ,category_id,city_id,owner_id,employee_id} = formik.values;
//   return !(title || slug ||description || price ||  area||bathrooms||bedrooms ||garage||floors||year_built
//             ||status||category_id||city_id || owner_id || employee_id);
// };
  

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1" xl="8">
          <Card className="shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Update Property</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
            <Form onSubmit={formik.handleSubmit}>
                <h6 className="heading-small text-muted mb-4">
                  Property information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-title">
                          Title
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Title"
                          name="title"
                          {...formik.getFieldProps("title")}
                          invalid={formik.touched.title && formik.errors.title}
                        />
                        {formik.touched.title && formik.errors.title && (
                          <div className="invalid-feedback">{formik.errors.title}</div>
                        )}
                      
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-slug">
                          Slug
                        </label>
                        <Input
                          className="form-control-alternative w-100"
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
                        <label className="form-control-label" htmlFor="input-description">
                          Description
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Description"
                          name="description"
                          {...formik.getFieldProps("Description")}
                          invalid={formik.touched.Description && formik.errors.Description}
                        />
                        {formik.touched.Description && formik.errors.Description && (
                          <div className="invalid-feedback">{formik.errors.Description}</div>
                        )}
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-price">
                          Price
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Price"
                          name="price"
                          {...formik.getFieldProps("price")}
                          invalid={formik.touched.price && formik.errors.price}
                        />
                        {formik.touched.price && formik.errors.price && (
                          <div className="invalid-feedback">{formik.errors.price}</div>
                        )}
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-image">
                          Image
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="file"
                          accept="image/*"
                          name="image"
                          {...formik.getFieldProps("image")}
                          invalid={formik.touched.image && formik.errors.image}
                        />
                        {formik.touched.image && formik.errors.image && (
                          <div className="invalid-feedback">{formik.errors.image}</div>
                        )}
                        
                      </FormGroup>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-area">
                          Area
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Area"
                          name="area"
                          {...formik.getFieldProps("Area")}
                          invalid={formik.touched.Area && formik.errors.Area}
                        />
                        {formik.touched.Area && formik.errors.Area && (
                          <div className="invalid-feedback">{formik.errors.Area}</div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-bathrooms">
                          Bathrooms
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Number of Bathrooms"
                          name="bathrooms"
                          {...formik.getFieldProps("bathrooms")}
                          invalid={formik.touched.bathrooms && formik.errors.bathrooms}
                        />
                        {formik.touched.bathrooms && formik.errors.bathrooms && (
                          <div className="invalid-feedback">{formik.errors.bathrooms}</div>
                        )}
                      
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-bedrooms">
                          Bedrooms
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Number of Bedrooms"
                          name="bedrooms"
                          {...formik.getFieldProps("bedrooms")}
                          invalid={formik.touched.bedrooms && formik.errors.bedrooms}
                        />
                        {formik.touched.bedrooms && formik.errors.bedrooms && (
                          <div className="invalid-feedback">{formik.errors.bedrooms}</div>
                        )}
                      
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-garage">
                          Garage
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Garage"
                          name="garage"
                          {...formik.getFieldProps("garage")}
                          invalid={formik.touched.garage && formik.errors.garage}
                        />
                        {formik.touched.garage && formik.errors.garage && (
                          <div className="invalid-feedback">{formik.errors.garage}</div>
                        )}
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-floors">
                          Floors
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Number of Floors"
                          name="floors"
                          {...formik.getFieldProps("floors")}
                          invalid={formik.touched.floors && formik.errors.floors}
                        />
                        {formik.touched.floors && formik.errors.floors && (
                          <div className="invalid-feedback">{formik.errors.floors}</div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-year-built">
                          Year Built
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Year Built"
                          name="year_built"
                          {...formik.getFieldProps("year_built")}
                          invalid={formik.touched.year_built && formik.errors.year_built}
                        />
                        {formik.touched.year_built && formik.errors.year_built && (
                          <div className="invalid-feedback">{formik.errors.year_built}</div>
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
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </Input>
                        {formik.touched.status && formik.errors.status && (
                          <div className="invalid-feedback">
                            {formik.errors.status}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-category-id">
                          Category ID
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Category ID"
                          name="category_id"
                          {...formik.getFieldProps("category_id")}
                          invalid={formik.touched.category_id && formik.errors.category_id}
                        />
                        {formik.touched.category_id && formik.errors.category_id && (
                          <div className="invalid-feedback">{formik.errors.category_id}</div>
                        )}
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-city-id">
                          City ID
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter City ID"
                          name="city_id"
                          {...formik.getFieldProps("city_id")}
                          invalid={formik.touched.city_id && formik.errors.city_id}
                        />
                        {formik.touched.city_id && formik.errors.city_id && (
                          <div className="invalid-feedback">{formik.errors.city_id}</div>
                        )}
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-owner-id">
                          Owner ID
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter Owner ID"
                          name="owner_id"
                          {...formik.getFieldProps("owner_id")}
                          invalid={formik.touched.owner_id && formik.errors.owner_id}
                        />
                        {formik.touched.owner_id && formik.errors.owner_id && (
                          <div className="invalid-feedback">{formik.errors.owner_id}</div>
                        )}
                        
                      </FormGroup>
                    </Col>
                  </Row>
                  
                   
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-employee_id">
                        Employee ID
                        </label>
                        <Input
                          className="form-control-alternative w-100"
                          type="text"
                          placeholder="Enter employee_id"
                          name="employee_id"
                          {...formik.getFieldProps("employee_id")}
                          invalid={formik.touched.employee_id && formik.errors.employee_id}
                        />
                        {formik.touched.employee_id && formik.errors.employee_id && (
                          <div className="invalid-feedback">{formik.errors.employee_id}</div>
                        )}
                        
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="text-center">
                <Btn
                    title="Update"
                    name="btn-danger btn"
                    onClick={formik.handleSubmit}
                    type="button"
                  />
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyUpdate;
