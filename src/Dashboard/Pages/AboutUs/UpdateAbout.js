import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosDashboard, AxiosWeb } from "../../../Axios";
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

const UpdateAbout = () => {
  const [about, setAbout] = useState({
    title: "",
    logo: null,
    description: "",
    phone: "",
    email: "",
    address: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      youtube: "",
      twitter: "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    getAbout();
  }, []);

  const getAbout = async () => {
    try {
      const response = await AxiosWeb.get("/data");
      setAbout(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbout((prevAbout) => ({
      ...prevAbout,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setAbout((prevAbout) => ({
      ...prevAbout,
      logo: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", about.title);
      formData.append("logo", about.logo);
      formData.append("description", about.description);
      formData.append("phone", about.phone);
      formData.append("email", about.email);
      formData.append("address", about.address);
      formData.append("facebook", about.socialMedia.facebook);
      formData.append("instagram", about.socialMedia.instagram);
      formData.append("youtube", about.socialMedia.youtube);
      formData.append("twitter", about.socialMedia.twitter);

      const response = await AxiosDashboard.patch("/data", formData);
      console.log(response.data);
      navigate("/dashboard/About");
    } catch (error) {
      console.log(error);
    }
  };

  if (empPermissions.split(",").includes("static_page")) {
    return (
      <Container className="mt--5">
        <Row className="justify-content-center">
          <Col lg="8">
            <Card className="shadow-lg">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center justify-content-center">
                  <Col xs="8">
                    <h3 className="mb-0">Update About</h3>
                  </Col>
                  <Col className="text-right">
                    <Link to={"/dashboard/About"}>
                      <Button className="btn btn-danger btn-sm" type="button">
                        <i className="fa fa-arrow-left mr-2"> Back</i>
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-3">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="title">
                          Title
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="title"
                          name="title"
                          type="text"
                          placeholder="Enter title"
                          value={about.title}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="logo">
                          Logo
                        </label>
                        <div className="custom-file">
                          <Input
                            type="file"
                            id="logo"
                            name="logo"
                            onChange={handleLogoChange}
                          />
                          <label className="custom-file-label" htmlFor="logo">
                            {about.logo ? about.logo.name : "Choose logo"}
                          </label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="description">
                      Description
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="description"
                      name="description"
                      type="text"
                      placeholder="Enter description"
                      value={about.description}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="phone">
                          Phone
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="phone"
                          name="phone"
                          type="text"
                          placeholder="Enter phone"
                          value={about.phone}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="email">
                          Email
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          value={about.email}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="address">
                      Address
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Enter address"
                      value={about.address}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="facebook">
                      Facebook
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="facebook"
                      name="facebook"
                      type="text"
                      placeholder="Enter Facebook URL"
                      value={about.socialMedia.facebook}
                      onChange={(e) =>
                        setAbout((prevAbout) => ({
                          ...prevAbout,
                          socialMedia: {
                            ...prevAbout.socialMedia,
                            facebook: e.target.value,
                          },
                        }))
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="instagram">
                      Instagram
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="instagram"
                      name="instagram"
                      type="text"
                      placeholder="Enter Instagram URL"
                      value={about.socialMedia.instagram}
                      onChange={(e) =>
                        setAbout((prevAbout) => ({
                          ...prevAbout,
                          socialMedia: {
                            ...prevAbout.socialMedia,
                            instagram: e.target.value,
                          },
                        }))
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="youtube">
                      YouTube
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="youtube"
                      name="youtube"
                      type="text"
                      placeholder="Enter YouTube URL"
                      value={about.socialMedia.youtube}
                      onChange={(e) =>
                        setAbout((prevAbout) => ({
                          ...prevAbout,
                          socialMedia: {
                            ...prevAbout.socialMedia,
                            youtube: e.target.value,
                          },
                        }))
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="twitter">
                      Twitter
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="twitter"
                      name="twitter"
                      type="text"
                      placeholder="Enter Twitter URL"
                      value={about.socialMedia.twitter}
                      onChange={(e) =>
                        setAbout((prevAbout) => ({
                          ...prevAbout,
                          socialMedia: {
                            ...prevAbout.socialMedia,
                            twitter: e.target.value,
                          },
                        }))
                      }
                    />
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Update
                    </Button>
                  </div>
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

export default UpdateAbout;
