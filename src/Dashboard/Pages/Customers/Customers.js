import Tables from "../../SharedUI/Table/Tables";
import Btn from "../../SharedUI/Btn/Btn";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import SweetAlert from "../../SharedUI/SweetAlert/SweetAlert";

const Customers = () => {
  const [customerList, setCustomerList] = useState([]);

  const getAllCustomers = async () => {
    const response = await axios.get("http://localhost:3001/customers");
    try {
      setCustomerList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCustomers();
  }, []);

  //use sweetalert to delete a customer

  return (
    <>
      <div>
        <Tables
          title="All Customers"
          route="/admin/customers"
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
          const
          tableRows={customerList.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>

              <td>
                <SweetAlert
                  id={item.id}
                  dataList={customerList}
                  setdataList={setCustomerList}
                  route="http://localhost:3001/customers"
                  text="Are you sure you want to delete this customer?"
                  action="delete"
                />
              </td>

              <td>
                <Link to={`/admin/Customers/details/${item.id}`}>
                  <i className="fa fa-eye btn-sm btn btn-info"></i>
                </Link>
              </td>
            </tr>
          ))}
        />
      </div>
    </>
  );
};

export default Customers;
