import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import Tables from "../../SharedUI/Table/Tables";
import Btn from "../../SharedUI/Btn/Btn";
import { AxiosDashboard } from "../../../Axios";

const empPermissions = localStorage.getItem("permissions");

const Properties = () => {

  const [propertyList, setPropertyList] = useState([]);
  const [totalPages, setTotalPages]=useState(0);
  const [currentPage, setCurrentPage]=useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const getPropertyList = async (page) => {
    try {
      const response = await AxiosDashboard.get("/properties", {
        params: {
          page: page,
        },
      });
      setPropertyList(response.data?.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPropertyList(currentPage);
  }, [currentPage]);


  const toggleActive = async (propertyId) => {
    try {
      const property = propertyList.find(
        (property) => property.id === propertyId
      );
      const newStatus = property.status === "active" ? "inactive" : "active";

      await AxiosDashboard.patch(`/properties/${propertyId}`, {
        status: newStatus,
      });

      setPropertyList((prevList) =>
        prevList.map((property) =>
          property.id === propertyId
            ? { ...property, status: newStatus }
            : property
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteProperty = async (propertyId) => {
  //   try {
  //     const response = await AxiosDashboard.delete(`/properties/${propertyId}`);
  //     if (response.status === 200) {
  //       setPropertyList((prevpropertyList) =>
  //         prevpropertyList.filter((property) => property.id !== propertyId)
  //       );
  //     } else {
  //       throw new Error("Failed to delete the property.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  

  return (
    <Tables
      title="All Properties"
      route="/dashboard/Properties/add"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      handleSearch={handleSearch}
      searchQuery={searchQuery}
      endpoint="properties"
      query="title"
      content={
        <>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Address</th>
          <th scope="col">Price</th>
          <th scope="col">Image</th>
          {/* <th scope="col">Area</th>
          <th scope="col">Bathrooms</th>
          <th scope="col">Bedrooms</th>
          <th scope="col">Garage</th>
          <th scope="col">Floors</th>
          <th scope="col">Year Built</th> */}
            <th scope="col">Status</th>
            {/* <th scope="col">Category ID</th>
          <th scope="col">City ID</th>
          <th scope="col">Property Type ID</th> */}
            {/* <th scope="col">Owner ID</th>
          <th scope="col">Employee ID</th> */}
          <th scope="col">Created At</th>
          <th scope="col">Updated At</th>
          <th scope="col">Actions</th>
        </>
      }
      tableData={(property, index) => (
        <>
          <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
          <td>{property.title}</td>
          <td>{property.address}</td>
          <td>{property.price}</td>
          <td>
            <img src={property.image} alt="Property" width="100" height="100" />
          </td>
          {/* <td>{property.area}</td>
          <td>{property.bathrooms}</td>
          <td>{property.bedrooms}</td>
          <td>{property.garage}</td>
          <td>{property.floors}</td>
          <td>{property.year_built}</td> */}
          <td>
              <Badge
                color={property.status === "active" ? "success" : "danger"}
                onClick={() => toggleActive(property.id)}
                style={{ cursor: "pointer", fontSize: "12px" }}
              >
                {property.status.charAt(0).toUpperCase() +
                  property.status.slice(1)}
              </Badge>
            </td>
            {/* <td>{property.category_id}</td>
          <td>{property.city_id}</td>
          <td>{property.property_type_id}</td> */}
            {/* <td>{property.owner_id}</td>
          <td>{property.employee_id}</td> */}
            <td>{property.created_at}</td>
            <td>{property.updated_at}</td>
            <td>
              <Link to={`/dashboard/Properties/update/${property.id}`}>
                <Btn className="btn-primary btn fa fa-edit" />
              </Link>

              <Link to={`/dashboard/Properties/details/${property.id}`}>
                <Btn className="btn-success btn fa fa-eye" />
              </Link>

              {/* <SweetAlert 
              id={property.id}
              dataList={propertyList}
              setdataList={setPropertyList}
              route="http://3bsi.nader-mo.tech/properties/"
              text="Are you sure you want to deletem this property"
              action="delete"
              handleAction={() => deleteProperty(property.id)} // Pass the correct ID here

            /> */}
          
          </td>
        </>
      )}
    />
  );
};
export default Properties;
