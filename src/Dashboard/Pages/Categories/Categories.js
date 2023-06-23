import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "reactstrap";
import Tables from "../../SharedUI/Table/Tables";
import Btn from "../../SharedUI/Btn/Btn";
import SweetAlert from "../../SharedUI/SweetAlert/SweetAlert";
import { AxiosDashboard } from "../../../Axios";

const Categories = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    console.log(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getCategoriesList();
  }, [currentPage]);

  const getCategoriesList = async () => {
    try {
      const response = await AxiosDashboard.get("/categories");
      setCategoriesList(response.data?.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleActive = async (categoryId) => {
    try {
      await AxiosDashboard.patch(`/categories/${categoryId}/toggle-active`);
      setCategoriesList((prevList) =>
        prevList.map((category) =>
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
      route="/dashboard/Categories/Add"
      currentPage={currentPage}
      totalPages={totalPages}
      endpoint="categories"
      query="name"
      queryValue={searchQuery}
      handleSearch={handleSearch}
      onPageChange={handlePageChange}
      content={
        <>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Active</th>
          <th scope="col">Created At</th>
          <th scope="col">Actions</th>
        </>
      }
      tableData={(category, index) => (
        <>
          <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
          {/* <tr key={category.id} style={{ backgroundColor: category.active ? 'white' : '#f6f9fc' }}> */}
          {/* <th scope="row">{category.id}</th> */}
          <td>{category.name}</td>
          <td>
            <Badge
              color={category.active ? "success" : "danger"}
              onClick={() => toggleActive(category.id)}
              style={{ cursor: "pointer", fontSize: "12px" }}
            >
              {category.active ? "Active" : "Inactive"}
            </Badge>
          </td>
          <td>{category.created_at}</td>
          <td>
            <Link to={`/dashboard/categories/Update/${category.id}`}>
              <Btn className="btn-primary btn fa fa-edit" />
            </Link>
          </td>
        </>
      )}
    />
  );
};

export default Categories;
