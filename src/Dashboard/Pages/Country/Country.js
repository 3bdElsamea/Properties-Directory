import Tables from "../../SharedUI/Table/Tables";
import { Link } from "react-router-dom";
import { AxiosDashboard } from "../../../Axios";
import { useEffect, useState } from "react";
import SweetAlert from "../../SharedUI/SweetAlert/SweetAlert";

const CreateCountry = () => {
  const [countryList, setCountryList] = useState([]);
  const [totalPages, setTotalPages]=useState(0);


  const getAllCountries = async () => {
    try {
      const response = await AxiosDashboard.get("/countries");
      setCountryList(response.data?.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = async (id, active) => {
    try {
      const response = await AxiosDashboard.patch(
        `/countries/${id}/toggle-active`
      );
      const updatedCountryList = countryList.map((country) => {
        if (country.id === id) {
          return {
            ...country,
            active: !active,
          };
        }
        return country;
      });
      setCountryList(updatedCountryList);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <>
      <div>
        <Tables
          title="All Countries"
          route="/dashboard/country/create"
          content={
            <>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">CreatedAt</th>
              <th scope="col">Status</th>
             
            </>
          }
          tableRows={countryList.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
                <td>
                  <button
                    className={`btn btn-${
                      item.active ? "success" : "danger"
                    } btn-sm`}
                    onClick={() => handleToggle(item.id, item.active)}
                  >
                    {item.active ? "Active" : "Inactive"}
                  </button>
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

export default CreateCountry;
