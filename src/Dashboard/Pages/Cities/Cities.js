import Tables from "../../SharedUI/Table/Tables";
import { AxiosDashboard } from "../../../Axios";
import { useEffect, useState } from "react";

const CreateCity = () => {
  const [cityList, setCityList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [totalPages, setTotalPages]=useState(0);
  const [currentPage, setCurrentPage]=useState(1);
  const [searchQuery, setSearchQuery] = useState("");


  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  return (
    <>
      <div>
        <Tables
          title="All Cities"
          route="/dashboard/city/create"
          totalPages={totalPages}
          currentPage={currentPage}
          endpoint="cities"
          onPageChange= {handlePageChange}
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
            </>
          }
          tableData={(item, index) => (
            <>
              <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
              <td>{item.name}</td>
              <td>{getCountryName(item.country_id)}</td>
              <td>{item.created_at}</td>
              <td>
                <span
                  className={`badge rounded-pill px-3 py-2 bg-${
                    item.active ? "success" : "danger"
                  }`}
                >
                  {item.active ? "Active" : "Inactive"}
                </span>

              </td>
            </>
          )}
        />
      </div>
    </>


  );
};

export default CreateCity;
