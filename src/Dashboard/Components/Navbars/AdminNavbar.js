// AdminNavbar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { Badge } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { AxiosDashboard } from "../../../Axios";
import Notifications from "./Notifications";

const AdminNavbar = (props) => {
  function handleLogout() {
    localStorage.removeItem("jwt"); // remove the JWT token from local storage
    localStorage.removeItem("permissions");
    window.location.href = "/auth/login"; // redirect the user to the login page
  }

  const [userData, setUserData] = useState(null);
  // const [notifications, setNotifications] = useState([]);
  // const [unreadCount, setUnreadCount] = useState(0);

  // const fetchNotifications = () => {
  //   // Get the JWT from the client-side storage
  //   const jwt = localStorage.getItem("jwt");
  //   AxiosDashboard.get("/notifications", {
  //     headers: {
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response?.data.notifications);
  //       setNotifications(response?.data.notifications);
  //       setUnreadCount(response?.data.unread_notifications);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });

  useEffect(() => {
    //fetchUserData();
  }, []);
  /*
    function fetchUserData() {
      // Get the JWT from the client-side storage
      const jwt = localStorage.getItem('jwt');
  
      // Send a request to the backend to get the user's data
      AxiosDashboard.get('/employees', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then(response => response.data)
        .then(data => {
          const payload = jwt.split('.')[1];
const decodedPayload = atob(payload);
const parsedPayload = JSON.parse(decodedPayload);
const id = parsedPayload.employeeId;

          console.log("id="+id);
          console.log("jwt="+jwt);
          const url = `http://3bsi.nader-mo.tech/dashboard/employees/${id}`;
          // Send a request to the backend to get the user's data
          AxiosDashboard.get(url, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          })
            .then(response => response.data)
            .then(data => {
              setUserData(data);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }*/
  /*
  if (!userData) {
    return (
      <div>Loading...</div>
    );
  }
  */

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-md-6">
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {props.brandText}
            </Link>
            <span>
            <Notifications />
            {/* <ReactNotifications /> */}
            <span onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '25px', color: 'white', cursor: 'pointer' }} />
                  </span>
            </span>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default AdminNavbar;
