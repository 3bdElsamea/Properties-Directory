import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import { AxiosDashboard } from "../../../../Axios";
import Input from "../../../SharedUI/Input/Input";
import Btn from "../../../SharedUI/Btn/Btn";
import "./Roles-Update.css";

const empPermissions = localStorage.getItem("permissions");

const RolesUpdate = () => {
  const { roleId } = useParams();
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [existingRole, setExistingRole] = useState(null);

  useEffect(() => {
    // Fetch permissions data from the API
    AxiosDashboard.get("/roles/get-permissions")
      .then((response) => {
        setPermissions(response.data.permissions);
        console.log(response.data.permissions);
      })
      .catch((error) => {
        console.error("Error fetching permissions:", error);
      });

    // Fetch existing role data
    AxiosDashboard.get(`/roles/${roleId}`)
      .then((response) => {
        setExistingRole(response.data.role);
        setRoleName(response.data.role.name);

        // Set selectedPermissions to the old values, excluding any permissions that are not in the new role
        setSelectedPermissions(
          response.data.role.RolePermissions
            ? response.data.role.RolePermissions.map(
                (permission) => permission.id
              ).filter((permissionId) =>
                response.data.permissions.some(
                  (permission) => permission.id === permissionId
                )
              )
            : []
        );
        console.log(response.data.role.RolePermissions);
      })
      .catch((error) => {
        console.error("Error fetching role:", error);
      });
  }, [roleId]);

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

    // Update the existing role in the "roles" table
    const updatedRole = {
      name: roleName,
      permissions: selectedPermissions, // Add selected permissions to the updated role
    };

    AxiosDashboard.patch(`/roles/${roleId}`, updatedRole)
      .then(() => {
        // Redirect to the roles list page
        window.location.href = "/dashboard/roles";
      })
      .catch((error) => {
        console.error("Error updating role:", error);
      });
  };

  const permissionTokens = [];
  for (let i = 0; i < permissions.length; i += 3) {
    const rowTokens = permissions.slice(i, i + 3).map((permission) => (
      <td
        key={permission.id}
        className={`permission-token ${
          selectedPermissions.includes(permission.id) ? "active" : ""
        }`}
        onClick={() => handleTokenToggle(permission.id)}
      >
        {permission.name}
      </td>
    ));

    permissionTokens.push(<tr key={i}>{rowTokens}</tr>);
  }

  if (!existingRole) {
    return <div>Loading...</div>;
  }

  if (empPermissions.split(",").includes("role")) {
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
                <Form
                  onSubmit={handleSubmit}
                  style={{ textAlign: "center", marginLeft: "40px" }}
                >
                  <Form.Group as={Row} controlId="formRoleName">
                    <Col sm={10}>
                      <Input
                        className="form-control mx-auto"
                        style={{
                          width: "70%",
                          marginBottom: "50px",
                          marginTop: "20px",
                        }}
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
                    <div
                      className="permission-tokens"
                      style={{ margin: "20px" }}
                    >
                      <table className="mx-auto">
                        <tbody>{permissionTokens}</tbody>
                      </table>
                    </div>
                  </Form.Group>
                  <Btn
                    className="btn btn-primary"
                    title="Save"
                    name="update-role-btn"
                    style={{ marginTop: "20px" }}
                  />
                </Form>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    ></Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  } else {
    window.location.href = "/ErrorPage";
  }
};

export default RolesUpdate;
