import Tables from "../../SharedUI/Table/Tables";
import { Link } from "react-router-dom";
import { AxiosDashboard } from "../../../Axios";
import { useEffect, useState } from "react";
import SweetAlert from "../../SharedUI/SweetAlert/SweetAlert";

const CreateCountry = () => {
  const [countryList, setCountryList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    console.log(query);
  };

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
  }, [currentPage]);

  return (
    <>
      <div>
        <Tables
          title="All Countries"
          route="/dashboard/country/create"
          totalPages={totalPages}
          currentPage={currentPage}
          endpoint="countries"
          query="name"
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          content={
            <>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">CreatedAt</th>
              <th scope="col">Status</th>
              <th></th>
            </>
          }
          tableData={(item, index) => (
            <>
              <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
              <td>{item.name}</td>
              <td>{item.created_at}</td>
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
              <td></td>
            </>
          )}
        />
      </div>
    </>
  );
};

export default CreateCountry;
