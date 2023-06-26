import Tables from "../../SharedUI/Table/Tables";
import { AxiosDashboard } from "../../../Axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Btn from "../../SharedUI/Btn/Btn";

const empPermissions = localStorage.getItem("permissions");

const CreateCity = () => {
  const [cityList, setCityList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleToggle = async (id, active) => {
    try {
      const response = await AxiosDashboard.patch(
        `/cities/${id}/toggle-active`
      );
      const updatedCountryList = cityList.map((city) => {
        if (city.id === id) {
          return {
            ...city,
            active: !active,
          };
        }
        return city;
      });
      setCountryList(updatedCountryList);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCities = async () => {
    try {
      const response = await AxiosDashboard.get("/cities?sort=created_at");
      setCityList(response.data?.data);

      //get the country name
      const countryName = await AxiosDashboard.get("/countries");
      setCountryList(countryName.data?.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCities();
  }, [currentPage]);

  const getCountryName = (countryId) => {
    const country = countryList.find((country) => country.id === countryId);
    return country ? country.name : "";
  };

  if (empPermissions.split(",").includes("city")) {
    return (
      <>
        <div>
          <Tables
            title="All Cities"
            route="/dashboard/cities/create"
            totalPages={totalPages}
            currentPage={currentPage}
            endpoint="cities"
            onPageChange={handlePageChange}
            handleSearch={handleSearch}
            searchQuery={searchQuery}
            query="name"
            content={
              <>
                <th scope="col">#</th>
                <th scope="col">City</th>
                <th scope="col">Country</th>
                <th scope="col">CreatedAt</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </>
            }
            tableData={(item, index) => (
              <>
                <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
                <td>{item.name}</td>
                <td>{getCountryName(item.country_id)}</td>
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
                <td>
                  <Link to={`/dashboard/cities/update/${item.id}`}>
                    <Btn className="btn-primary btn-sm fa fa-edit" />
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

export default CreateCity;
