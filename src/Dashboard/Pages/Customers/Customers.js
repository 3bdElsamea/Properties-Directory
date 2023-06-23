import Tables from "../../SharedUI/Table/Tables";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SweetAlert from "../../SharedUI/SweetAlert/SweetAlert";
import { AxiosDashboard } from "../../../Axios";

const empPermissions = localStorage.getItem("permissions");

const Customers = () => {
  const [customerList, setCustomerList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    console.log(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getAllCustomers = async () => {
    const response = await AxiosDashboard.get("/customers");
    try {
      setCustomerList(response.data?.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const filterRows = (rows, query) => {
    if (!query || query.trim() === "") {
      return rows; // Return all rows when there is no query or it's empty after trimming
    }

    return rows.filter((row) => {
      const name = row.name ? row.name.toLowerCase() : "";
      return name.includes(query.toLowerCase());
    });
  };

  useEffect(() => {
    getAllCustomers();
  }, [currentPage]);

  const filteredCustomerList = filterRows(customerList, searchQuery);

  //use sweetalert to delete a customer
  if (empPermissions.split(",").includes("customer")) {
    return (
      <>
        <div>
          <Tables
            title="All Customers"
            route="/dashboard/customers/create"
            totalPages={totalPages}
            currentPage={currentPage}
            handleSearch={setSearchQuery}
            searchQuery={searchQuery}
            onPageChange={setCurrentPage}
            endpoint="customers"
            query = "name"
            quaryValue={searchQuery}
            content={
              <>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Actions</th>
                <th scope="col"></th>
              </>
            }
            tableData={(item, index) => (
              <>
                <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>

                <td>
                  <SweetAlert
                    id={item.id}
                    dataList={customerList}
                    setdataList={setCustomerList}
                    route="/customers"
                    text="Are you sure you want to delete this customer?"
                    action="delete"
                  />
                </td>

                <td>
                  <Link to={`/dashboard/customers/details/${item.id}`}>
                    <i className="fa fa-eye btn-sm btn btn-info"></i>
                  </Link>
                </td>
              </>
            )}
          />
        </div>
      </>
    );
  } else {
    window.location.href = "/ErrorPage";
  }
};

export default Customers;
