import React, { useEffect, useState } from "react";
import Axios from "../../../Axios"; // Import Axios instance
import Tables from "../../SharedUI/Table/Tables";
import { FaInfoCircle } from "react-icons/fa";
import Btn from "../../SharedUI/Btn/Btn";
import "./Requests.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch requests data from the API
    Axios.get("/requests")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });

    // Fetch customers data from the API
    Axios.get("/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });

    // Fetch properties data from the API
    Axios.get("/dashboard/properties")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  const updateRequestStatus = (requestId, newStatus) => {
    // Update request status in the API
    Axios.patch(`/requests/${requestId}`, { status: newStatus })
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
      <th>Updated At</th>
    </>
  );

  const tableContent = requests.map((request) => {
    // Find the customer and property associated with the request
    const customer = customers.find((user) => user.id === request.customer_id);
    const property = properties.find(
      (property) => property.id === request.property_id
    );

    const handleCustomerClick = () => {
      // Redirect to the customer details page
      window.location.href = `/dashboard/Customers/details/${customer.id}`;
    };

    const handlePropertyClick = () => {
      // Redirect to the property details page
      window.location.href = `dashboard/properties/${property.id}`;
    };

    return (
      <tr key={request.id}>
        <td>{request.id}</td>
        <td>
          {customer ? (
            <>
              {`${customer.firstName} ${customer.lastName}`}
              <Btn
                onClick={handleCustomerClick}
                className="icon-button requInfo"
                title={<FaInfoCircle />}
              />
            </>
          ) : (
            ""
          )}
        </td>
        <td>
          {property ? (
            <>
              {property.title}
              <Btn
                onClick={handlePropertyClick}
                className="icon-button requInfo"
                title={<FaInfoCircle />}
              />
            </>
          ) : (
            ""
          )}
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
        <td>{request.created_at}</td>
        <td>{request.updated_at}</td>
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
