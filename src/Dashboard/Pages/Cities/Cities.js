import Tables from "../../SharedUI/Table/Tables";
import { AxiosDashboard } from "../../../Axios";
import { useEffect, useState } from "react";

const CreateCity = () => {
  const [cityList, setCityList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [totalPages, setTotalPages]=useState(0);


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
  }, []);

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
          content={
            <>
              <th scope="col">#</th>
              <th scope="col">City</th>
              <th scope="col">Country</th>
              <th scope="col">CreatedAt</th>
            </>
          }
          tableRows={cityList.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{getCountryName(item.country_id)}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        />
      </div>
    </>
  );
};

export default CreateCity;
