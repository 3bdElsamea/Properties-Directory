import React, { useEffect, useState } from "react";
import { AxiosDashboard } from "../../../Axios";
import { Link } from "react-router-dom";
import Tables from "../../SharedUI/Table/Tables";
import { FaInfoCircle } from "react-icons/fa";
import Btn from "../../SharedUI/Btn/Btn";
import "./Requests.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [customers, setCustomers] = useState({});
  const [properties, setProperties] = useState({});

  useEffect(() => {
    // Fetch requests data from the API
    AxiosDashboard.get("/property-requests")
      .then((response) => {
        setRequests(response.data.data);
        setTotalPages(response.data.data.totalPage);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch customers data from the API
    AxiosDashboard.get("/customers")
      .then((response) => {
        const customersData = response.data.data.reduce((acc, customer) => {
          acc[customer.id] = customer.name;
          return acc;
        }, {});
        setCustomers(customersData);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch properties data from the API
    AxiosDashboard.get("/properties")
      .then((response) => {
        const propertiesData = response.data.data.reduce((acc, property) => {
          acc[property.id] = property.title;
          return acc;
        }, {});
        setProperties(propertiesData);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  const updateRequestStatus = (requestId, newStatus) => {
    // Update request status in the API
    AxiosDashboard.patch(`/property-requests/${requestId}`, { status: newStatus })
      .then(() => {
        // Update the requests state with the updated status
        const updatedRequests = requests.map((request) => {
          if (request.id === requestId) {
            return { ...request, status: newStatus };
          }
          return request;
        });
        setRequests(updatedRequests);
      })
      .catch((error) => {
        console.error("Error updating request status:", error);
      });
  };

  const handleStatusChange = (requestId, event) => {
    const newStatus = event.target.value;
    updateRequestStatus(requestId, newStatus);
  };

  const trContent = (
    <>
      <th>ID</th>
      <th>Customer Name</th>
      <th>Property Title</th>
      <th>Status</th>
      <th>Created At</th>
    </>
  );

  const tableContent = requests.map((request) => {
    const customerName = customers[request.customer_id] || "";
    const propertyTitle = properties[request.property_id] || "";
    console.log(request.customer_id);

    return (
      <tr key={request.id}>
        <td>{request.id}</td>
        <td>
          <Link to={"/dashboard/customers/details/" + request.customer_id} className="icon-link mr-2">
            <FaInfoCircle />
          </Link>
          {customerName}
        </td>
        <td>
        <Link to={"/dashboard/Properties/details/" + request.property_id} className="icon-link mr-2">
            <FaInfoCircle />
          </Link>
          {propertyTitle}
        </td>
        <td>
          <select
            value={request.status}
            onChange={(event) => handleStatusChange(request.id, event)}
            className="status-select"
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="rejected">Rejected</option>
          </select>
        </td>
        <td>{request.created_at.split("T")[0]}</td>
      </tr>
    );
  });

  return (
    <>
      <Tables title="Requests" tableRows={tableContent} content={trContent} />
    </>
  );
};

export default Requests;
