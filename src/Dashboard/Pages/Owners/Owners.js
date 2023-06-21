import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import Tables from "../../SharedUI/Table/Tables";
import Btn from "../../SharedUI/Btn/Btn";
import SweetAlert from "../../SharedUI/SweetAlert/SweetDelete";
import { AxiosDashboard } from "../../../Axios";

const empPermissions = localStorage.getItem("permissions");

const Owners = () => {
  const [ownerList, setOwnerList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getOwnerList();
  }, []);

  const deleteOwner = async (ownerId) => {
    try {
      const response = await AxiosDashboard.delete(`/owners/${ownerId}`);
      if (response.data.status.data === 200) {
        setOwnerList((prevOwnerList) =>
          prevOwnerList.filter((owner) => owner.id !== ownerId)
        );
      } else {
        throw new Error("Failed to delete the owner.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOwnerList = async () => {
    try {
      const response = await AxiosDashboard.get("/owners");
      setOwnerList(response.data.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusBadgeColor = (status) => {
    const lowerCaseStatus = status.toLowerCase();
    switch (lowerCaseStatus) {
      case "active":
        return "success";
      case "inactive":
        return "danger";
      case "pending":
        return "warning";
      default:
        return "primary";
    }
  };

  if (empPermissions.split(",").includes("owner")) {
    return (
      <Tables
        title="All Owners"
        route="/dashboard/Owners/Add"
        content={
          <>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">National ID</th>
            <th scope="col">Status</th>
            <th scope="col">Created At</th>
            <th scope="col">Actions</th>
          </>
        }
        tableRows={ownerList.map((owner) => (
          <tr key={owner.id}>
            <th scope="row">{owner.id}</th>
            <td>{owner.name}</td>
            <td>{owner.email}</td>
            <td>{owner.phone}</td>
            <td>{owner.national_id}</td>
            <td>
              <Badge color={getStatusBadgeColor(owner.status)}>
                {owner.status}
              </Badge>
            </td>
            <td>{owner.created_at}</td>
            <td>
              <Link to={`/dashboard/Owners/Update/${owner.id}`}>
                <Btn className="btn-primary btn fa fa-edit" />
              </Link>
              <Link to={`/dashboard/Owners/Details/${owner.id}`}>
                <Btn className="btn-success btn fa fa-eye" />
              </Link>
              {/* <SweetAlert
              id={owner.id}
              dataList={ownerList}
              setdataList={setOwnerList}
              route="http://3bsi.nader-mo.tech/owners"
              text="Are you sure you want to delete this owner?"
              action="delete"
              handleAction={() => deleteOwner(owner.id)} // Pass the correct ID here
            /> */}
            </td>
          </tr>
        ))}
      />
    );
  } else {
    window.location.href = "/ErrorPage";
  }
};

export default Owners;
