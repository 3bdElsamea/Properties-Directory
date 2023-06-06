import Tables from "../../SharedUI/Table/Tables";
import Btn from "../../SharedUI/Btn/Btn";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "../../SharedUI/SweetAlert/SweetAlert";
const Employees = () => {
  const [employeeList, setEmployeeList] = useState([]);


  //get the data from db.json using axios
  const getAllEmployees = async () => {
    const response = await axios.get("http://localhost:3001/employees");
    try {
      setEmployeeList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <>
      <div>
        <Tables
          title="All Employees"
          route="/dashboard/create-employee"
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
          tableRows={employeeList.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
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
                  route="http://localhost:3001/employees"
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
              <td>
                
              </td>
            </tr>
          ))}
        />
      </div>
    </>
  );
};

export default Employees;
