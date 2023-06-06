import axios from "axios";

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

export { AxiosDashboard, AxiosWeb };
