import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { AxiosWeb } from "../../../Axios";
import "./Aboutus.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  const [about, setAbout] = useState([]);
  const [activeTab, setActiveTab] = useState("general");
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  //to get all daata from api
  const getAbout = async () => {
    try {
      const response = await AxiosWeb.get("/data");
      setAbout(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAbout();
  }, []);

  const renderSocialMediaLink = (icon, link, color) => {
    return (
      link && (
        <p>
          {icon({ color: color, size: "1.1rem" })}
          <a href={link} target="_blank">
            <span>{link}</span>
          </a>
        </p>
      )
    );
  };

  return (
    <Container className="mt--5" fluid>
      <Card className="shadow">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === "general" ? "active " : ""}
              onClick={() => toggleTab("general")}
            >
              About Us
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={activeTab === "terms" ? "active" : ""}
              onClick={() => toggleTab("terms")}
            >
              Terms and Conditions
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="general">
            <Card className="mb-2">
              <CardHeader>
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="mb-0">General Information</h6>
                  <Link to="/dashboard/About/Update">
                    <button className="btn btn-primary ms-0">
                     Edit
                    </button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody className="shadow">
                <p>
                  Title:<span>{about.title}</span>
                </p>

                <p>
                  Logo:
                  <img
                    src={about.logo}
                    className="w-25 h-25 ml-1 rounded"
                  ></img>
                </p>
                <p>
                  Description:<span>{about.description}</span>
                </p>
              </CardBody>
            </Card>
            <Card className="border-1 mb-2 py-2">
              <CardHeader>
                <h6 className="mb-0">Contact Us</h6>
              </CardHeader>
              <CardBody>
                <p>
                  Phone:<span>{about.phone}</span>
                </p>
                <p>
                  Email:<span>{about.email}</span>
                </p>
                <p>
                  Address:<span>{about.address}</span>{" "}
                </p>
                {about.socialMedia && (
                  <>
                    {renderSocialMediaLink(
                      FaFacebook,
                      about.socialMedia.facebook,
                      "blue"
                    )}
                    {renderSocialMediaLink(
                      FaInstagram,
                      about.socialMedia.instagram,
                      "red"
                    )}
                    {renderSocialMediaLink(
                      FaTwitter,
                      about.socialMedia.twitter,
                      "blue"
                    )}
                    {renderSocialMediaLink(
                      FaYoutube,
                      about.socialMedia.youtube,
                      "red"
                    )}
                  </>
                )}
              </CardBody>
            </Card>
          </TabPane>
          <TabPane tabId="terms">
            <CardBody>
              <h4>Terms and Conditions</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                facilisis tortor id purus consectetur faucibus. Nulla pulvinar
                purus vitae sem luctus convallis. Sed id efficitur urna.
              </p>
              <p>
                Phasellus ac ligula id augue feugiat pellentesque at sit amet
                sem. Sed pulvinar dictum metus. Nullam hendrerit, metus at
                tristique ullamcorper, enim mi feugiat justo, nec egestas arcu
                sem eu justo.
              </p>
            </CardBody>
          </TabPane>
        </TabContent>
      </Card>
    </Container>
  );
};

export default About;
