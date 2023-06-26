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
          AxiosDashboard.delete(`${route}/${id}`)
            .then((response) => {
              setdataList(updatedList);
              console.log(response.data);
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (action === "block") {
          AxiosDashboard.patch(`${route}/${id}`, { blocked: initialBlocked })
            .then((response) => {
              console.log("jooo", response.data);
              setBlocked(blocked);
              setdataList(
                dataList.map((data) =>
                  data.id === id ? { ...data, blocked: blocked } : data
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
        ) : (
          <button
            className={`btn btn-${blocked ? "danger" : "primary"} btn-sm`}
            onClick={handleAction}
          >
            {blocked ? "Block" : "Unblock"}
          </button>
        )}
      </>
    </>
  );
};

export default SweetAlert;
