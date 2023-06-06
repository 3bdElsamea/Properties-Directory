import Tables from "../../SharedUI/Table/Tables";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import SweetAlert from "../../SharedUI/SweetAlert/SweetAlert";

const CreateLocations = () => {
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const getAllLocations = async () => {
    try {
      const response1 = await axios.get("http://localhost:3001/countries");
      setCountryList(response1.data);
      const response2 = await axios.get("http://localhost:3001/cities");
      setCityList(response2.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLocations();
  }, []);

  const getCityName = (cityId) => {
    const city = cityList.find((item) => item.id === cityId);
    return city ? city.name : "";
  };

  return (
    <>
      <div>
        <Tables
          title="All Locations"
          route="/admin/locations/create"
          content={
            <>
              <th scope="col">#</th>
              <th scope="col">Country</th>
              <th scope="col">City</th>
              <th scope="col"></th>
              <th scope="col">Action</th>
              <th scope="col"></th>
            </>
          }
          tableRows={countryList.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{getCityName(item.id)}</td>
              <td>
                <SweetAlert
                  id={item.id}
                  dataList={countryList}
                  setdataList={setCountryList}
                  route="http://localhost:3001/locations"
                  text="Are you sure you want to delete this location?"
                  action="delete"
                />
              </td>
              <td>
                <Link to={`/admin/locations/details/${item.id}`}>
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

export default CreateLocations;
