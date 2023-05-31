import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

const SweetAlert = ({ id, dataList, setdataList, text, route, action }) => {
  const handleAction = () => {
    Swal.fire({
      title: "Are you sure?",
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${route}/${id}`);
          if (response.status === 200) {
            const updatedList = dataList.filter((data) => data.id !== id);
            setdataList(updatedList);
            Swal.fire({
              title: `${action} successful!`,
              icon: "success",
            });
          } else {
            throw new Error("Failed to delete the item.");
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Oops...",
            text: "Something went wrong while deleting the item.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <button className="btn btn-danger btn-m" onClick={handleAction}>
      {action === "delete" ? (
        <i className="fa fa-trash"></i>
      ) : (
        <i className="fa fa-ban"></i>
      )}
    </button>
  );
};

export default SweetAlert;
