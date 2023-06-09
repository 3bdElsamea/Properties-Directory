import Tables from "../../SharedUI/Table/Tables";
import Btn from "../../SharedUI/Btn/Btn";
import { AxiosDashboard } from "../../../Axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "../../SharedUI/SweetAlert/SweetAlert";

const empPermissions = localStorage.getItem("permissions");

const Employees = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages]=useState(0);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    console.log(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getAllEmployees = async (page) => {
    try {
      const response = await AxiosDashboard.get(`/employees`);
      const { data } = response.data;
      const { meta } = response.data.totalPage;
      setEmployeeList(data);
      setTotalPages(meta);
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
    getAllEmployees(currentPage);
  }, [currentPage]);

  const filteredEmployeeList = filterRows(employeeList, searchQuery);

  if (empPermissions.split(",").includes("employee")) {
    return (
      <>
        <div>
          <Tables
            title="All Employees"
            route="/dashboard/employee/create"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            endpoint="employees"
            query="name"
            queryValue={searchQuery}
            handleSearch  ={handleSearch}
            content={
              <>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Role</th>
                <th scope="col">Block</th>
                <th scope="col">Actions</th>
              </>
            }
            tableData={(item, index) => (
              <>
              <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.Role?item.Role.name:"no role"}</td>
                <td>
                  <SweetAlert
                    id={item.id}
                    dataList={employeeList}
                    setdataList={setEmployeeList}
                    text="You are about to change the block status of this employee."
                    route="/employees"
                    action="block"
                    initialBlocked={item.blocked == 0 ? 1 : 0}
                  />
                </td>
                <td>
                  <Link to={`/dashboard/update-employee/${item.id}`}>
                    <Btn className="btn-primary btn-sm fa fa-edit" />
                  </Link>

                  <Link to={`/dashboard/employees/details/${item.id}`}>
                    <Btn className="btn-success btn-sm fa fa-eye ml-4" />
                  </Link>
                </td>
                <td></td>
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

export default Employees;
