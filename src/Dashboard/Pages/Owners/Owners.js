import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import Tables from '../../SharedUI/Table/Tables';
import Btn from '../../SharedUI/Btn/Btn';
import SweetAlert from '../../SharedUI/SweetAlert/SweetDelete';

import axios from 'axios';

const Owners = () => {
  const [ownerList, setOwnerList] = useState([]);

  useEffect(() => {
    getOwnerList();
  }, []);
  const deleteOwner = async (ownerId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/owners/${ownerId}`);
      if (response.status === 200) {
        setOwnerList((prevOwnerList) =>
          prevOwnerList.filter((owner) => owner.id !== ownerId)
        );
      } else {
        throw new Error('Failed to delete the owner.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getOwnerList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/owners');
      setOwnerList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tables
      title="All Owners"
      route="/admin/Owners/Add"
      content={
        <>
          <th scope="col">id</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">phone</th>
          <th scope="col">National_id</th>
          <th scope="col">status</th>
          <th scope="col">created_At</th>
          <th scope="col">Actions</th>
        </>
      }
      tableRows={ownerList.map((owner) => (
        <tr key={owner.id}>
          <th scope="row">{owner.id}</th>
          <td>{owner.name}</td>
          <td>{owner.email}</td>
          <td>{owner.phone}</td>
          <td>{owner.national_id}</td>
          <td>
            <Badge
              color={
                owner.status === 'active'
                  ? 'success'
                  : owner.status === 'inactive'
                  ? 'secondary'
                  : owner.status === 'pending'
                  ? 'warning'
                  : 'danger'
              }
            >
              {owner.status}
            </Badge>
          </td>
          <td>{owner.created_At}</td>
          <td>
            <Link to={`/admin/Owners/Update/${owner.id}`}>
              <Btn name="btn-primary btn fa fa-edit" />
            </Link>

            <SweetAlert
              id={owner.id}
              dataList={ownerList}
              setdataList={setOwnerList}
              route="http://localhost:5000/owners"
              text="Are you sure you want to delete this owner?"
              action="delete"
              handleAction={() => deleteOwner(owner.id)} // Pass the correct ID here
            />
            
          </td>
        </tr>
      ))}
    />
  );
};

export default Owners;
