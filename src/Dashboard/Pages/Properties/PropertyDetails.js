

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Btn from 'Dashboard/SharedUI/Btn/Btn';
import { AxiosDashboard } from '../../../Axios';
import { useHistory } from 'react-router-dom';

import SweetAlert from 'Dashboard/SharedUI/SweetAlert/SweetDelete';
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
// ...

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [showAllGallery, setShowAllGallery] = useState(false);
  // const history = useHistory();

  useEffect(() => {
    getPropertyDetails();
  }, []);

  const getPropertyDetails = async () => {
    try {
      const response = await AxiosDashboard.get(`/Properties/${propertyId}`);
      setProperty(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShowAllGallery = () => {
    setShowAllGallery(!showAllGallery);
  };

  const deleteImage = async (imageId) => {
    try {
      // Delete image from property
      const updatedProperty = { ...property };
      updatedProperty.galleryImages = updatedProperty.galleryImages.filter(image => image.id !== imageId);
      setProperty(updatedProperty);

      // Delete image from the server database
      await AxiosDashboard.delete(`/Properties/${propertyId}/${imageId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleAddImage = () => {
  //   // Redirect to the image upload page or implement your own logic
  //   history.push(`/property/${propertyId}/add-image`);
  // };


  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1" xl="12">
          <Card className="shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Property Gallery</h3>
                </Col>
                <Col xs="4" className="text-right">
                  <Button
                    color="primary"
                    size="sm"
                    onClick={toggleShowAllGallery}
                  >
                    {showAllGallery ? 'Hide All Gallery' : 'Show All Gallery'}
                  </Button>
                  <Button
                    color="success"
                    size="sm"
                    className="ml-2"
                    // onClick={handleAddImage}
                  >
                    Add Image
                  </Button>
                </Col>
              </Row>
            </CardHeader>

            <CardBody>
              {!showAllGallery && property && (
                <Row>
                  <Col xs={12} md={6}>
                    <Image
                      src={property.image}
                      alt="Property"
                      rounded
                      width="100%"
                      height="auto"
                      style={{ marginBottom: '20px' }}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="d-flex flex-column">
                      <h5>Property Information</h5>
                      <br />

                      {/* Property details */}
                      <div className="d-flex align-items-center mb-2">
                        <i className="fas fa-envelope mr-2 text-info"></i>
                        <span className="font-weight-bold mr-1">Title:</span>
                        {property.title}
                      </div>
                      <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-dollar-sign mr-2 text-info"></i>
                      <span className="font-weight-bold mr-1">Price:</span>
                      {property.price}
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-align-left mr-2 text-info" ></i>
                      <span className="font-weight-bold mr-1">Description:</span>
                      {property.description}
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-ruler-combined mr-2 text-info"></i>
                      <span className="font-weight-bold mr-1">Area:</span>
                      {property.area}
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-tag mr-2 text-info"></i>
                      <span className="font-weight-bold mr-1">Category ID:</span>
                      {property.categoryId}
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-city mr-2 text-info"></i>
                      <span className="font-weight-bold mr-1">City ID:</span>
                      {property.cityId}
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-user mr-2 text-info"></i>
                      <span className="font-weight-bold mr-1">Owner ID:</span>
                      {property.ownerId}
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-user-tie mr-2 text-info"></i>
                      <span className="font-weight-bold mr-1">Employee ID:</span>
                      {property.employeeId}
                    </div>
                      {/* Add other property details here */}
                    </div>
                  </Col>
                </Row>
              )}

              <Row>
                {showAllGallery ? (
                  property && property.galleryImages && property.galleryImages.length > 0 ? (
                    property.galleryImages.map((image) => (
                      <Col xs={6} md={4} key={image.id}>
                        <div className="position-relative">
                          <Image
                            src={image.image}
                            alt="Property"
                            rounded
                            width="250"
                            height="180"
                            style={{ marginBottom: '20px' }}
                          />
                          <div className="position-absolute top-0 end-0 mt-0 me-2">
                            <Btn className="btn-primary btn fa fa-edit mx-0 btn-m" />
                            <Btn
                              className="btn-danger btn fa fa-trash mx-0 btn-m"
                              onClick={() => deleteImage(image.id)}
                            />
                          </div>
                        </div>
                      </Col>
                    ))
                  ) : (
                    <p>No images in the gallery</p>
                  )
                ) : (
                  property && property.galleryImages && property.galleryImages.length > 0 && (
                    property.galleryImages.map((image) => (
                      <Col xs={6} md={4} key={image.id}>
                        <div className="position-relative">
                          <Image
                            src={image.image}
                            alt="Property"
                            rounded
                            width="250"
                            height="180"
                            style={{ marginBottom: '20px' }}
                          />
                        </div>
                      </Col>
                    ))
                  )
                )}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetails;

