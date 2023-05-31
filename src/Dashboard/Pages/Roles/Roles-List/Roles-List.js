import React, { useEffect, useState } from "react";
import Axios from "../../../../Axios"; // Import Axios instance
import Tables from "../../../SharedUI/Table/Tables";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Btn from "../../../SharedUI/Btn/Btn";
import "./Roles-List.css";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);

  useEffect(() => {
    // Fetch roles data from the API
    Axios.get("/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });

    // Fetch permissions data from the API
    Axios.get("/permissions")
      .then((response) => {
        setPermissions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching permissions:", error);
      });

    // Fetch role permissions data from the API
    Axios.get("/role_permissions")
      .then((response) => {
        setRolePermissions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching role permissions:", error);
      });
  }, []);

  

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
      window.location.href = `/admin/roles/update/${role.id}`;
    };

    const handleDelete = () => {
      Axios.delete(`/roles/${role.id}`)
        .then((response) => {
          // Handle successful deletion, e.g., show a success message
          const updatedRoles = roles.filter((r) => r.id !== role.id);
          setRoles(updatedRoles); // Update the roles state
        })
        .catch((error) => {
          // Handle error, e.g., show an error message or handle the error in any other way
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
        <Btn className="icon-button roleIcon updateRole" onClick={handleUpdate} title={<FaEdit />}/>
        <Btn className="icon-button roleIcon deleteRole" onClick={handleDelete} title={<FaTrash />}/>
      </td>
      </tr>
    );
  });

  return (
    <>
      <Tables title="Roles" tableRows={tableContent} content={trContent} />
    </>
  );
};

export default Roles;