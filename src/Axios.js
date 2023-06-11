import axios from "axios";
import { toast } from "react-toastify";

const AxiosDashboard = axios.create({
  baseURL: "http://3bsi.nader-mo.tech/dashboard",
});

const AxiosWeb = axios.create({
  baseURL: "http://3bsi.nader-mo.tech",
});

AxiosWeb.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AxiosDashboard.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AxiosDashboard.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      let i = 1;
      error.response.data.errors.forEach((element) => {
        toast(element.trim('"'), {
          position: "bottom-right",
          autoClose: 5000 * i,
        });
        i = i * 1.3;
      });
    }
    return Promise.reject(error);
  }
);

export { AxiosDashboard, AxiosWeb };
