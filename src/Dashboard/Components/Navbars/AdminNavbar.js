// AdminNavbar.js
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
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
import Axios from "../../../Axios";

const AdminNavbar = (props) => {
  function handleLogout() {
    localStorage.removeItem('jwt'); // remove the JWT token from local storage
    window.location.href = '/auth/login'; // redirect the user to the login page
  }

  const [userData, setUserData] = useState(null);

    useEffect(() => {
      fetchUserData();
    }, []);
  
    function fetchUserData() {
      // Get the JWT from the client-side storage
      const jwt = localStorage.getItem('jwt');
  
      // Send a request to the backend to get the user's data
      Axios.get('/users', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then(response => response.data)
        .then(data => {
          const parts = jwt.split('.');
          const encodedPayload = parts[1];
          const payload = JSON.parse(atob(encodedPayload));
          const id = payload.id;
          const url = `http://localhost:3001/users/${id}`;
          // Send a request to the backend to get the user's data
          Axios.get(url, {
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
    }
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
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" />
                </InputGroup>
              </FormGroup>
            </Form>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("../../Assets/img/theme/team-4-800x800.jpg")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {userData ? (userData.firstName+" "+userData.lastName) : 'Loading...'}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={handleLogout}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default AdminNavbar;