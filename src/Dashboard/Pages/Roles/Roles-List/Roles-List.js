import React, { useEffect, useState } from "react";
import { AxiosDashboard } from "../../../../Axios";
import Tables from "../../../SharedUI/Table/Tables";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Btn from "../../../SharedUI/Btn/Btn";
import "./Roles-List.css";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    AxiosDashboard.get("/roles")
      .then((response) => {
        setRoles(response.data.roles.data);
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
  
    // Extract role permissions
    const rolePermissions = roles.length > 0 ? roles[0].RolePermissions : [];
    setRolePermissions(rolePermissions);
  }, [roles]);
  

  const trContent = (
    <>
      <th>ID</th>
      <th>Name</th>
      <th>Permissions</th>
      <th>Actions</th>
    </>
  );

  const tableContent = roles.map((role) => {
    const handleUpdate = () => {
      window.location.href = `/roles/update/${role.id}`;
    };

    const handleDelete = () => {
      AxiosDashboard.delete(`/roles/${role.id}`)
        .then((response) => {
          const updatedRoles = roles.filter((r) => r.id !== role.id);
          setRoles(updatedRoles);
        })
        .catch((error) => {
          console.error("Error deleting role:", error);
        });
    };

    const rolePermissionNames = rolePermissions
      .filter((rolePermission) => rolePermission.role_id === role.id)
      .map((rolePermission) => {
        const permission = permissions.find(
          (p) => p.id === rolePermission.permission_id
        );
        return permission ? permission.name : null;
      })
      .filter((name) => name !== null);

    const permissionTableContent = rolePermissionNames.map((permissionName) => {
      return (
        <tr key={permissionName}>
          <td>{permissionName}</td>
        </tr>
      );
    });

    const permissionTable = (
      <table>
        <tbody>{permissionTableContent}</tbody>
      </table>
    );

    return (
      <tr key={role.id}>
        <td>{role.id}</td>
        <td>{role.name}</td>
        <td>{permissionTable}</td>
        <td>
          <Btn className="icon-button roleIcon updateRole" onClick={handleUpdate} title={<FaEdit />} />
          <Btn className="icon-button roleIcon deleteRole" onClick={handleDelete} title={<FaTrash />} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <Tables content={trContent} tableRows={tableContent} />
    </>
  );
};

export default Roles;
