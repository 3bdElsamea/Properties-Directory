import React, { useEffect, useState } from "react";
import { AxiosDashboard } from "../../../Axios";
import Tables from "../../SharedUI/Table/Tables";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

const empPermissions = localStorage.getItem("permissions");

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState({});
  const [properties, setProperties] = useState({});
  const [loading, setLoading] = useState(true);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getAllRequests = async () => {
    try {
      const response = await AxiosDashboard.get("/property-requests");
      const requests = response.data.data;
      const totalPages = response.data.totalPages;
      setRequestList(requests);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateRequestStatus = (requestId, newStatus) => {
    // Update the requests state with the updated status locally
    const updatedRequests = requests.map((request) => {
      if (request.id === requestId) {
        return { ...request, status: newStatus };
      }
      return request;
    });
    setRequests(updatedRequests);

    // Update request status in the API
    AxiosDashboard.patch(`/property-requests/${requestId}`, {
      status: newStatus,
    })
      .then(() => {
        // API call was successful
      })
      .catch((error) => {
        console.error("Error updating request status:", error);
        // Revert the local update if the API call fails
        const revertedRequests = requests.map((request) => {
          if (request.id === requestId) {
            return { ...request, status: request.status };
          }
          return request;
        });
        setRequests(revertedRequests);
      });
  };

  const handleStatusChange = (requestId, event) => {
    const newStatus = event.target.value;
    updateRequestStatus(requestId, newStatus);
  };

  useEffect(() => {
    getAllRequests();
  }, []);
  

  if (empPermissions.split(",").includes("property_request")) {
    return (
      <>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Tables
              title="All Requests"
              route="/dashboard/property_request/create"
              totalPages={totalPages}
              currentPage={currentPage}
              endpoint="property-requests"
              onPageChange={handlePageChange}
              handleSearch={handleSearch}
              searchQuery={searchQuery}
              query="status"
              queryValue={searchQuery}
              content={
                <>
                  <th scope="col">#</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Property</th>
                  <th>Status</th>
                  <th>Created At</th>
                </>
              }
              tableData={(item, index) => (
                <>
                  <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
                  <td>
                    <Link
                      to={"/dashboard/customers/details/" + item.customer_id}
                      className="icon-link mr-2"
                    >
                      <FaInfoCircle />
                    </Link>
                    {item.Customer.name}
                  </td>
                  <td>
                    <Link
                      to={"/dashboard/Properties/details/" + item.property_id}
                      className="icon-link mr-2"
                    >
                      <FaInfoCircle />
                    </Link>
                    {item.Property.title}
                  </td>
                  <td>
                    <select
                      onChange={(event) => handleStatusChange(item.id, event)}
                      className="status-select"
                      value={item.status}
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td>{item.created_at.split("T")[0]}</td>
                </>
              )}
            />
          )}
        </div>
      </>
    );
  } else {
    window.location.href = "/ErrorPage";
    return null;
  }
};

export default Requests;
