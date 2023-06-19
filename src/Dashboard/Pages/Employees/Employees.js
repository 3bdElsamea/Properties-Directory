import Tables from "../../SharedUI/Table/Tables";
import Btn from "../../SharedUI/Btn/Btn";
import { AxiosDashboard } from "../../../Axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "../../SharedUI/SweetAlert/SweetAlert";
const Employees = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]=useState(0);
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setFilteredEmployeeList(filterRows(employeeList, query));
  };

  const filterRows = (rows, query) => {
    return rows.filter((row) =>
      row.name.toLowerCase().includes(query.toLowerCase())
    );
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getAllEmployees = async (page) => {
    try {
      const response = await AxiosDashboard.get(`/employees`);
      const { data, meta } = response.data;
      setEmployeeList(data);
      setFilteredEmployeeList(filterRows(data, searchQuery));
      setTotalPages(meta.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployees(currentPage);
  }, [currentPage, searchQuery]);

 
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
          fetchData={getAllEmployees}
          filteredTableRows={filteredEmployeeList}
          setFilteredTableRows={setFilteredEmployeeList}

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
        >
          
          {filteredEmployeeList.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.role}</td>
              <td>
                <SweetAlert
                  id={item.id}
                  dataList={employeeList}
                  setdataList={setEmployeeList}
                  text="You are about to change the block status of this employee."
                  route="/employees"
                  action="block"
                  initialBlocked={item.blocked}
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
            </tr>
          ))}
        </Tables> 
      </div>
    </>


       
  );
};

export default Employees;
