import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardHeader, CardFooter, Container } from "reactstrap";
import { Form, Row, Col } from "react-bootstrap";
import { AxiosDashboard } from "../../../../Axios";
import Input from "../../../SharedUI/Input/Input";
import Btn from "../../../SharedUI/Btn/Btn";

const RolesUpdate = () => {
  const { id } = useParams(); // Retrieve the role ID from the URL
  const roleId = parseInt(id);
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [rolePermissionIds, setRolePermissionIds] = useState([]);

  useEffect(() => {
    // Fetch role data from the API
    AxiosDashboard.get(`/roles/${id}`)
      .then((response) => {
        setRoleName(response.data.name);
      })
      .catch((error) => {
        console.error("Error fetching role:", error);
      });

    // Fetch permissions data from the API
    AxiosDashboard.get("/permissions")
      .then((response) => {
        setPermissions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching permissions:", error);
      });

    // Fetch role permissions data from the API
    AxiosDashboard.get(`/role_permissions?role_id=${id}`)
      .then((response) => {
        const rolePermissions = response.data.map(
          (rolePermission) => rolePermission.permission_id
        );
        setSelectedPermissions(rolePermissions);
      })
      .catch((error) => {
        console.error("Error fetching role permissions:", error);
      });
  }, [id]);

  const handleTokenToggle = (permissionId) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions((prevPermissions) =>
        prevPermissions.filter((id) => id !== permissionId)
      );
      setRolePermissionIds((prevIds) =>
        prevIds.filter((id) => id.permission_id !== permissionId)
      );
    } else {
      setSelectedPermissions((prevPermissions) => [
        ...prevPermissions,
        permissionId,
      ]);
      setRolePermissionIds((prevIds) => [
        ...prevIds,
        { role_id: roleId, permission_id: permissionId }
      ]);
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();

    // Update the role in the "roles" table with updated_at field
    const updatedRole = {
      name: roleName,
      updated_at: new Date().toISOString(),
    };

    AxiosDashboard.put(`/roles/${id}`, updatedRole)
      .then(() => {
        // Update role-permission relationships in the "role_permissions" table
        AxiosDashboard.get(`/role_permissions?role_id=${id}`)
          .then((response) => {
            const existingPermissions = response.data.map(
              (rolePermission) => rolePermission.permission_id
            );

            // Remove obsolete role-permission relationships
            const rolePermissionsToDelete = existingPermissions.filter(
              (permissionId) => !selectedPermissions.includes(permissionId)
            );
            rolePermissionsToDelete.map((permissionId) => {
              AxiosDashboard.delete(`/role_permissions/?role_id=${id}&permission_id=${permissionId}`)
                .then(() => {
                  console.log("Role permission deleted successfully");
                })
                .catch((error) => {
                    console.log(id+","+permissionId);
                  console.log("Error deleting role permission:", error);
                });
            });

            // Add new role-permission relationships
            const rolePermissionsToAdd = selectedPermissions.filter(
              (permissionId) => !existingPermissions.includes(permissionId)
            );
            rolePermissionsToAdd.forEach((permissionId) => {
              const rolePermission = {
                role_id: roleId,
                permission_id: permissionId,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              };

              AxiosDashboard.post("/role_permissions", rolePermission)
                .then(() => {
                  // Role permission created successfully
                })
                .catch((error) => {
                  console.error("Error creating role permission:", error);
                });
            });

            // Redirect to the roles list page
            window.location.href = "/dashboard/roles";
          })
          .catch((error) => {
            console.error("Error fetching role permissions:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating role:", error);
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
                    <h3 className="mb-0">Update Role</h3>
                  </Col>
                  <Col>
                    <Link to="/dashboard/roles">
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
              <Form onSubmit={handleSubmit} style={{ textAlign: "center", marginLeft: '40px' }}>
                <Form.Group as={Row} controlId="formRoleName">
                  <Col sm={10}>
                    <Input
                      className="form-control"
                      style={{ width: "50%", marginBottom: "50px" }}
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
                  <div className="permission-tokens" style={{ margin: "20px" }}>
                    {permissionTokens}
                  </div>
                </Form.Group>
                <Btn
                  className="btn btn-primary"
                  title="Update Role"
                  name="update-role-btn"
                  style={{ marginTop: "20px" }}
                />
              </Form>
              <CardFooter className="py-4">
                {/* Pagination component */}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default RolesUpdate;
