import React, { useEffect, useState } from "react";
import { AxiosDashboard } from "../../../../Axios";
import Tables from "../../../SharedUI/Table/Tables";
import { FaEdit, FaTrash } from "react-icons/fa";
import Btn from "../../../SharedUI/Btn/Btn";
import "./Roles-List.css";
import SweetAlert from "../../../SharedUI/SweetAlert/SweetAlert";

const empPermissions = localStorage.getItem("permissions");

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
    


  useEffect(() => {
    AxiosDashboard.get("/roles")
      .then((response) => {
        setRoles(response.data.roles.data);
        setTotalPages(response.data.roles.totalPage);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });

    AxiosDashboard.get("/roles/get-permissions")
      .then((response) => {
        setPermissions(response.data.permissions);
      })
      .catch((error) => {
        console.error("Error fetching permissions:", error);
      });
  }, []);

  useEffect(() => {
    // Extract role permissions
    const rolePermissions = roles.length > 0 ? roles[0].RolePermissions : [];
    setRolePermissions(rolePermissions);
  }, [roles]);

  const handleDeleteRole = (roleId) => {
    AxiosDashboard.delete(`/roles/${roleId}`)
      .then((response) => {
        setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
      })
      .catch((error) => {
        console.error("Error deleting role:", error);
      });
  };

  const handleUpdate = (roleId) => {
    // Redirect to the edit page with the role ID
    window.location.href = `/dashboard/roles/${roleId}`;
  };

  const trContent = (
    <>
      <th>ID</th>
      <th>Name</th>
      <th>Permissions</th>
      <th>Actions</th>
    </>
  );

  const tableContent = roles.map((role) => {
    const rolePermissionIds = role.RolePermissions.map(
      (rolePermission) => rolePermission.permission_id
    );

    const rolePermissionNames = permissions
      .filter((permission) => rolePermissionIds.includes(permission.id))
      .map((permission) => permission.name);

    const permissionTableContent = rolePermissionNames.map(
      (permissionName, index) => {
        if (index > 0 && index % 3 === 0) {
          return (
            <React.Fragment key={permissionName}>
              <br />
              {permissionName}
            </React.Fragment>
          );
        } else if (index > 0) {
          return (
            <React.Fragment key={permissionName}>
              &nbsp; | {permissionName}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={permissionName}>
              {permissionName}
            </React.Fragment>
          );
        }
      }
    );

    const permissionTable = <div>{permissionTableContent}</div>;

    return (
      <tr key={role.id}>
        <td>{role.id}</td>
        <td>{role.name}</td>
        <td>{permissionTable}</td>
        <td>
          <Btn
            className="icon-button roleIcon updateRole"
            onClick={() => handleUpdate(role.id)}
            title={<FaEdit />}
          />
          <SweetAlert
            id={role.id}
            dataList={roles}
            setdataList={setRoles}
            route="http://3bsi.nader-mo.tech/dashboard/roles"
            text="Are you sure you want to delete this role?"
            action="delete"
            handleAction={() => handleDeleteRole(role.id)}
          />
        </td>
      </tr>
    );
  });

  if (empPermissions.split(",").includes("role")) {
    return (
      <>
        <Tables
          content={trContent}
          tableRows={tableContent}
          title="All Roles"
          route="/dashboard/roles/create"
        />
      </>
    );
  } else {
    window.location.href = "/ErrorPage";
  }
};

export default Roles;
