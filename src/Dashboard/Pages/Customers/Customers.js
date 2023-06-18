import Tables from "../../SharedUI/Table/Tables";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SweetAlert from "../../SharedUI/SweetAlert/SweetAlert";
import { AxiosDashboard } from '../../../Axios';

const Customers = () => {
  const [customerList, setCustomerList] = useState([]);
  const [totalPages, setTotalPages]=useState(0);


  const getAllCustomers = async () => {
    const response = await AxiosDashboard.get("/customers");
    try {
      setCustomerList(response.data?.data);
      setTotalPages(response.data.totalPage);
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
          route="/dashboard/customers/create"
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
                  route = "/customers"
                  
                  text="Are you sure you want to delete this customer?"
                  action="delete"
                />
              </td>

              <td>
                <Link to={`/dashboard/customers/details/${item.id}`}>
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
