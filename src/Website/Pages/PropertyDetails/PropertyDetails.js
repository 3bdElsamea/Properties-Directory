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
} from 'reactstrap';
import ChatComponent from '../../Components/Chat/Chat';

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [requestedProperties, setRequestedProperties] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getPropertyDetails();
    getRequestedProperties();
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token'); // Check for token in local storage
    setIsLoggedIn(!!token); // Update the login status based on token availability
  };

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

  const getRequestedProperties = async () => {
    try {
      const response = await AxiosWeb.get('/requests');
      const requestedPropertyIds = response.data.map((request) => request.property_id);
      setRequestedProperties(requestedPropertyIds);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async (property_id) => {
    try {
      await AxiosWeb.post(`/requests/${property_id}`);
      // Handle success or show a message to the user
      console.log('Request submitted successfully!');
      setRequestedProperties((prevState) => [...prevState, property_id]);
    } catch (error) {
      console.log(error);
      // Handle error or show an error message to the user
    }
  };

  return (
    <Container>
      <Row>
        <Col className="order-xl-3" xl="12">
          <Card className="shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Property Details</h3>
                </Col>
                <Col xs="4" className="text-right">
                  <Button color="primary" size="sm" onClick={toggleShowAllGallery}>
                    {showAllGallery ? 'Hide All Gallery' : 'Show All Gallery'}
                  </Button>
                  {property && requestedProperties.includes(property.id) ? (
                    <span className="requestedSpan">Already requested</span>
                  ) : isLoggedIn ? (
                    <Btn
                      onClick={() => handleRequest(property.id)}
                      title="Request"
                      className="btn updateBtnProperty ud-btn btn-success mt-1 mb-0 updateBtn fs-5"
                    />
                  ) : null}
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
                      height="85%"
                      style={{ marginBottom: '10px', marginTop: '25px' }}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="d-flex flex-column mt-3">
                      <h3>Property Information</h3>
                      <br />
                      <div className="d-flex align-items mb-4">
                        <i className="fas fa-envelope mr-2 text-info"></i>
                        <span className="font-weight-bold mr-1">Title:</span>
                        <span>{property.title}</span>
                        <i className="fas fa-dollar-sign ml-4 text-info"></i>
                        <span className="font-weight-bold mr-1">Price:</span>
                        <span>{property.price}</span>
                      </div>
                      <div className="d-flex align-items mb-4">
                        <i className="fas fa-align-left mr-2 text-info"></i>
                        <span className="font-weight-bold mr-1">Description:</span>
                        <span>{property.description}</span>
                      </div>
                      <div className="d-flex align-items mb-4">
                        <i className="fas fa-ruler-combined mr-2 text-info"></i>
                        <span className="font-weight-bold mr-1">Area:</span>
                        <span>{property.area}</span>
                        <i className="fas fa-bath ml-3 text-info"></i>
                        <span className="font-weight-bold mr-1">Bathrooms:</span>
                        <span>{property.bathrooms}</span>
                        <i className="fas fa-bed ml-3 text-info"></i>
                        <span className="font-weight-bold mr-1">Bedrooms:</span>
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="d-flex align-items mb-4">
                        <i className="fas fa-car mr-2 text-info"></i>
                        <span className="font-weight-bold mr-1">Garage:</span>
                        <span>{property.garage}</span>
                        <i className="fas fa-layer-group ml-3 text-info"></i>
                        <span className="font-weight-bold mr-1">Floors:</span>
                        <span>{property.floors}</span>
                        <i className="fas fa-calendar-alt ml-3 text-info"></i>
                        <span className="font-weight-bold mr-1">Year Built:</span>
                        <span>{property.year_built}</span>
                      </div>
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

              <Row>
                <Col>
                  <Link to="/properties" className="btn btn-primary">
                    Back to Properties
                  </Link>
                
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ChatComponent />
    </Container>
  );
};

export default PropertyDetails;
