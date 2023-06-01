import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import Tables from '../../SharedUI/Table/Tables';
import Btn from '../../SharedUI/Btn/Btn';
import SweetAlert from '../../SharedUI/SweetAlert/SweetDelete';

import axios from 'axios';

const Properties = () => {
  const [propertyList, setPropertyList] = useState([]);

  useEffect(() => {
    getPropertyList();
  }, []);

  const getPropertyList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Properties');
      setPropertyList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProperty = async (propertyId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/Properties/${propertyId}`);
      if (response.status === 200) {
        setPropertyList((prevpropertyList) =>
          prevpropertyList.filter((property) => property.id !== propertyId)
        );
      } else {
        throw new Error('Failed to delete the property.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tables
      title="All Properties"
      route="/admin/Properties/add"
      content={
        <>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
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
      tableRows={propertyList.map((property) => (
        <tr key={property.id}>
          <th scope="row">{property.id}</th>
          <td>{property.title}</td>
          <td>{property.description}</td>
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
              color={
                property.status === 'active'
                  ? 'danger'
                  : property.status === 'pending'
                  ? 'primary'
                  : 'success'
              }
            >
              {property.status}
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
            <Link to={`/admin/Properties/update/${property.id}`}>
              <Btn className="btn-primary btn fa fa-edit" />
            </Link>
            
              <Link to={`/admin/Properties/details/${property.id}`}>
                <Btn className="btn-primary btn fa fa-eye" />
              </Link>

            <SweetAlert 
              id={property.id}
              dataList={propertyList}
              setdataList={setPropertyList}
              route="http://localhost:3001/Properties/"
              text="Are you sure you want to deletem this property"
              action="delete"
              handleAction={() => deleteProperty(property.id)} // Pass the correct ID here

            />
          </td>
        </tr>
      ))}
    />
  );
};
export default Properties;