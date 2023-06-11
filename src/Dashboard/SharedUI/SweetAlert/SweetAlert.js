import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Btn from "../Btn/Btn";
import { FaTrash } from "react-icons/fa";

import { AxiosDashboard } from "../../../Axios";
const SweetAlert = ({
  id,
  dataList,
  setdataList,
  text,
  route,
  action,
  initialBlocked,
}) => {
  const [blocked, setBlocked] = useState(initialBlocked);
  const handleAction = () => {
    setBlocked(!blocked);
    Swal.fire({
      title: "Are you sure?",
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedList = dataList.filter((data) => data.id !== id);
        if (action === "delete") {
          AxiosDashboard
            .delete(`${route}/${id}`)
            .then((response) => {
              setdataList(updatedList);
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (action === "block") {
          const updatedBlocked = !blocked;
          AxiosDashboard
            .patch(`${route}/${id}`, { blocked: updatedBlocked })
            .then((response) => {
              console.log(response.data);
              setBlocked(updatedBlocked);
              setdataList(
                dataList.map((data) =>
                  data.id === id ? { ...data, blocked: updatedBlocked } : data
                )
              );
            })
            .catch((error) => {
              console.log(error);
            });
        }
        Swal.fire({
          title: `${action} status updated!`,
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <>
        {action === "delete" ? (
          <Btn
            className="icon-button roleIcon deleteRole"
            onClick={handleAction}
            title={<FaTrash />}
          />
          /*<i className={"fa fa-trash text-danger"} onClick={handleAction}></i>*/
        ) : (
          <button
            className={`btn btn-${blocked ? "primary" : "danger"} btn-sm`}
            onClick={handleAction}
          >
            {blocked ? "Blocked" : "Unblocked"}
          </button>
        )}
      </>
    </>
  );
};

export default SweetAlert;