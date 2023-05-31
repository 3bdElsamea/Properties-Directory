import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'reactstrap';
import Tables from '../../SharedUI/Table/Tables';
import Btn from '../../SharedUI/Btn/Btn';
import SweetAlert from '../../SharedUI/SweetAlert/SweetAlert';
import axios from 'axios';

const Categories = () => {
  const [CategoriesList, setCategoriesList] = useState([]);
  console.log(CategoriesList);

  useEffect(() => {
    getCategoriesList();
  }, []);

  const getCategoriesList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Categories');
      setCategoriesList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleActive = async (categoryId) => {
    try {
      await axios.put(`http://localhost:5000/Categories/${categoryId}/toggleActive`);
      setCategoriesList(prevList =>
        prevList.map(category =>
          category.id === categoryId
            ? { ...category, active: !category.active }
            : category
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tables
      title="All Categories"
      route="/admin/Categories/Add"
      content={
        <>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">active</th>
          <th scope="col">created_At</th>
          <th scope="col">actions</th>
        </>
      }
      tableRows={CategoriesList.map((category) => (
        <tr key={category.id} style={{ backgroundColor: category.active ? 'white' : '#f6f9fc' }}>
          <th scope="row">{category.id}</th>
          <td>{category.name}</td>
          <td>
            <Badge
              color={category.active ? 'success' : 'danger'}
              onClick={() => toggleActive(category.id)}
              style={{ cursor: 'pointer' , fontSize: '12px' }}
            >
              {category.active ? 'Active' : 'Inactive'}
            </Badge>
          </td>
          <td>{category.created_At}</td>
          <td>
            <Link to={`/admin/Categories/Update/${category.id}`}>
              <Btn name="btn-primary btn fa fa-edit" />
            </Link>
          </td>
        </tr>
      ))}
    />
  );
};

export default Categories;
