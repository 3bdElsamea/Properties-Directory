import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
// import { FaTrash } from "react-icons";
import Btn from 'Dashboard/SharedUI/Btn/Btn';
import axios from 'axios';
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

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    getPropertyDetails();
  }, []);

  const getPropertyDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/Properties/${propertyId}`);
      setProperty(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`http://localhost:5000/Properties/${propertyId}/${imageId}`);
      setProperty((prevProperty) => ({
        ...prevProperty,
        galleryImages: prevProperty.galleryImages.filter((image) => image.id !== imageId)
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0"> Property Details</h3>
                </Col>
              </Row>
            </CardHeader>

            {property ? (
              <div>
                {property.galleryImages && property.galleryImages.length > 0 ? (
                  <CardBody>
                    <Row  className="mb-4">

                      {property.galleryImages.map((image) => (
                        <Col xs={6} md={4}  key={image.id}>
                          <div className="position-relative">
                          <Image src={image.image} alt="Property" rounded width="250" height="180" style={{ marginBottom: '20px' }} /><br />
                            <div className="position-absolute top-0 end-0 mt-0 me-2">
                             
                               <Btn name="btn-primary btn fa fa-edit mx-0 sm "   />
                               <Btn name="btn-danger btn fa fa-trash  mx-0"  />

                            </div>
                          </div>
                         
                        </Col>
                        
                      ))}
                    </Row>
                  </CardBody>
                ) : (
                  <p>No images in the gallery</p>
                )}
              </div>
            ) : (
              <p>Loading property details...</p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetails;
