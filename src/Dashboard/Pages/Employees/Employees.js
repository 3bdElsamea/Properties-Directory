import Tables from "../../SharedUI/Table/Tables";
import Btn from "../../SharedUI/Btn/Btn";
import { AxiosDashboard } from "../../../Axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "../../SharedUI/SweetAlert/SweetAlert";
const Employees = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages]=useState(0);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getAllEmployees = async (page) => {
    const response = await AxiosDashboard.get("/employees", {
      params: {
        page: page,
      },
    });
    try {
      setEmployeeList(response.data?.data);
      setTotalPages(response.data.totalPage);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployees(currentPage);
  }, [currentPage]);

  const filteredEmployeeList = employeeList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <Tables
          title="All Employees"
          route="/dashboard/employee/create"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
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
          const
          tableRows={filteredEmployeeList.map((item, index) => (
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
          searchQuery={searchQuery}
          handleSearch={handleSearch}
        />
      </div>
    </>
  );
};

export default Employees;
