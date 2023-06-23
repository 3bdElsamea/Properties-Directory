import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "reactstrap";
import Tables from "../../SharedUI/Table/Tables";
// import Btn from "../../SharedUI/Btn/Btn";
// import SweetAlert from "../../SharedUI/SweetAlert/SweetAlert";
import { AxiosDashboard } from "../../../Axios";

const empPermissions = localStorage.getItem("permissions");

const Categories = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const getCategoriesList = async (page) => {
    try {
      const response = await AxiosDashboard.get("/categories",{
        params: {
          page: page,
        },
      });
      setCategoriesList(response.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategoriesList(currentPage);
  }, [currentPage]);
 
  // const toggleActive = async (categoryId) => {
  //   try {
  //     await AxiosDashboard.patch(`/categories/${categoryId}/toggle-active`);
  //     setCategoriesList((prevList) =>
  //       prevList.map((category) =>
  //         category.id === categoryId
  //           ? { ...category, active: !category.active }
  //           : category
  //       )
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (empPermissions.split(",").includes("category")) {
    return (
      <Tables
        title="All Categories"
        currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        // route="/dashboard/Categories/Add"
        content={
          <>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Active</th>
            <th scope="col">Created At</th>
            <th scope="col">Actions</th>
          </>
        }
        tableRows={categoriesList.map((category) => (
          <tr
            key={category.id}
            style={{ backgroundColor: category.active ? "white" : "#f6f9fc" }}
          >


            <th scope="row">{category.id}</th>
            <td>{category.name}</td>
            <td>
              <Badge
                color={category.active ? "success" : "danger"}
                // onClick={() => toggleActive(category.id)}
                style={{ cursor: "pointer", fontSize: "12px" }}
              >
                {category.active ? "Active" : "Inactive"}
              </Badge>
            </td>
            <td>{category.created_at}</td>
            {/* <td>
              <Link to={`/dashboard/categories/Update/${category.id}`}>
                <Btn className="btn-primary btn fa fa-edit" />
              </Link>
            </td> */}
          </tr>
        ))}
      />
    );
  } else {
    window.location.href = "/ErrorPage";
  }
};

export default Categories;
