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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    console.log(query);
  };

  useEffect(() => {
    getOwnerList();
  }, [currentPage]);

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

  const getOwnerList = async (page) => {
    try {
      const response = await AxiosDashboard.get("/owners", {
        params: {
          page: page,
        },
      });
      setOwnerList(response.data?.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOwnerList(currentPage);
  }, [currentPage]);

  {
    /*} const getStatusBadgeColor = (status) => {
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
  };*/
  }

  if (empPermissions.split(",").includes("owner")) {
    return (
      <Tables
        title="All Owners"
        onPageChange={handlePageChange}
        route="/dashboard/Owners/Add"
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        endpoint="owners"
        query="name"
        queryValue={searchQuery}
        content={
          <>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">National ID</th>
            {/*<th scope="col">Status</th>*/}
            <th scope="col">Created At</th>
            <th scope="col">Actions</th>
          </>
        }
        tableData={(owner, index) => (
          <>
            <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>

            <td>{owner.name}</td>
            <td>{owner.email}</td>
            <td>{owner.phone}</td>
            <td>{owner.national_id}</td>
            {/*<td>
              <Badge color={getStatusBadgeColor(owner.status)}>
                {owner.status}
              </Badge>
        </td>*/}
            <td>{new Date(owner.created_at).toLocaleString()}</td>
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
          </>
        )}
      />
    );
  } else {
    window.location.href = "/ErrorPage";
  }
};

export default Owners;
