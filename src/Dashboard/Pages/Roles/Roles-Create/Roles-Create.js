import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import { Form, Row, Col } from "react-bootstrap";
import Axios from "../../../../Axios";
import Input from "../../../SharedUI/Input/Input";
import Btn from "../../../SharedUI/Btn/Btn";
import "./Roles-Create.css";

const RolesCreate = () => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    // Fetch permissions data from the API
    Axios.get("/permissions")
      .then((response) => {
        setPermissions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching permissions:", error);
      });
  }, []);

  const handleTokenToggle = (permissionId) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions((prevPermissions) =>
        prevPermissions.filter((id) => id !== permissionId)
      );
    } else {
      setSelectedPermissions((prevPermissions) => [
        ...prevPermissions,
        permissionId,
      ]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new role in the "roles" table with created_at and updated_at fields
    const newRole = {
      name: roleName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    Axios.post("/roles", newRole)
      .then((response) => {
        const roleId = response.data.id;

        // Create role-permission relationships in the "role_permissions" table with id, created_at, and updated_at fields
        selectedPermissions.forEach((permissionId) => {
          const rolePermission = {
            role_id: roleId,
            permission_id: permissionId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          Axios.post("/role_permissions", rolePermission)
            .then(() => {
              // Role permission created successfully
            })
            .catch((error) => {
              console.error("Error creating role permission:", error);
            });
        });

        // Redirect to the roles list page
        window.location.href = "/admin/roles";
      })
      .catch((error) => {
        console.error("Error creating role:", error);
      });
  };

  const permissionTokens = permissions.map((permission) => (
    <div
      key={permission.id}
      className={`permission-token ${
        selectedPermissions.includes(permission.id) ? "active" : ""
      }`}
      onClick={() => handleTokenToggle(permission.id)}
    >
      {permission.name}
    </div>
  ));

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col>
                    <h3 className="mb-0">Create New Role</h3>
                  </Col>
                  <Col>
                    <Link to="/admin/roles">
                      <Btn
                        className="btn btn-primary"
                        style={{ marginLeft: "50%", minWidth: "100px" }}
                        title="Show All Roles"
                        name="back-btn"
                      />
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <Form onSubmit={handleSubmit} style={{textAlign:'center', marginLeft:'40px'}}>
                <Form.Group as={Row} controlId="formRoleName">
                  <Col sm={10}>
                    <Input
                      className="form-control"
                      style={{ width: "70%", marginBottom: "50px", marginTop: "20px"}}
                      placeholder="Enter Role Name"
                      type="text"
                      name="roleName"
                      value={roleName}
                      id="roleName"
                      handleChange={(event) =>
                        setRoleName(event.target.value)
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group controlId="formPermissions">
                  <Form.Label>Select Permissions:</Form.Label>
                  <div className="permission-tokens" style={{margin:"20px"}}>{permissionTokens}</div>
                </Form.Group>
                <Btn
                  className="btn btn-primary"
                  title="Save"
                  name="create-role-btn"
                  style={{marginTop:"20px"}}
                />
              </Form>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                         2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default RolesCreate;
