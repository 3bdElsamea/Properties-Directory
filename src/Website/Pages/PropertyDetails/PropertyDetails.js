import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Btn from '../../SharedUI/Btn/Btn';
import { AxiosWeb } from '../../../Axios';
import { Link } from 'react-router-dom';
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
        const response = await AxiosWeb.get(`/properties/${propertyId}`);
        setProperty(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const toggleShowAllGallery = () => {
      setShowAllGallery(!showAllGallery);
    };
  
  return (
      <Row>
        <Col className="order-xl-1" xl="12">
          <Card className="shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Property Gallery</h3>
                </Col>
                <Col xs="4" className="text-right">
                  <Button color="primary" size="sm" onClick={toggleShowAllGallery}>
                    {showAllGallery ? 'Hide All Gallery' : 'Show All Gallery'}
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
                      height="90%"
                      style={{ marginBottom: '10px' }}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="d-flex flex-column mt-3">
                      <h3>Property Information</h3>
                      <br />

                      {/* Property details */}
                      <div className="d-flex align-items-center p-2 mb-2">
                        <i className="fas fa-envelope mr-2 text-info"></i>
                        <span className="font-weight-bold mr-1">Title:</span>
                        {property.title}
                      </div>
                      <div className="d-flex align-items-center p-2  mb-2">
                        <i className="fas fa-dollar-sign mr-2 text-info"></i>
                        <span className="font-weight-bold mr-1">Price:</span>
                        {property.price}
                      </div>
                      <div className="d-flex align-items-center p-2  mb-2">
                        <i className="fas fa-align-left mr-2 text-info"></i>
                        <span className="font-weight-bold mr-1">Description:</span>
                        {property.description}
                      </div>
                      <div className="d-flex align-items-center p-2  mb-2">
                        <i className="fas fa-ruler-combined mr-2 text-info"></i>
                        <span className="font-weight-bold mr-1">Area:</span>
                        {property.area}
                      </div>
                   
                     
                   
                      {/* Add other property details here */}
                    </div>
                  </Col>
                </Row>
              )}

              <Row>
                {showAllGallery ? (
                  property && property.PropertyImages && property.PropertyImages.length > 0 ? (
                    property.PropertyImages.map((image) => (
                      <Col xs={6} md={4} key={image.id}>
                        <div className="position-relative">
                          <Image
                            src={image.image}
                            alt="Property"
                            rounded
                            width="100%"
                            height="180"
                            style={{ marginBottom: '20px' }}
                          />
                       
                        </div>
                      </Col>
                    ))
                  ) : (
                    <p>No images in the gallery</p>
                  )
                ) : (
                  property &&
                  property.PropertyImages &&
                  property.PropertyImages.length > 0 &&
                  property.PropertyImages.map((image) => (
                    <Col xs={6} md={4} key={image.id}>
                      <div className="position-relative">
                        <Image
                          src={image.image}
                          alt="Property"
                          rounded
                          width="100%"
                          height="180"
                          style={{ marginBottom: '20px' }}
                        />
                      </div>
                    </Col>
                  ))
                )}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
  )
}

export default PropertyDetails
