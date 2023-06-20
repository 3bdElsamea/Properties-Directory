import axios from "axios";
import { toast } from "react-toastify";

const AxiosDashboard = axios.create({
	//baseURL: "https://estate-cetz.onrender.com/dashboard",
	baseURL: "http://localhost:3000/dashboard",
});

const AxiosWeb = axios.create({
	//baseURL: "https://estate-cetz.onrender.com",
	baseURL: "http://localhost:3000",
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
		if (error.response) {
			if (error.response.status === 403) {
				let i = 1;
				error.response.data.errors.forEach((element) => {
					toast(element.trim('"'), {
						position: "bottom-right",
						autoClose: 5000 * i,
					});
					i = i * 1.3;
				});
			} else if (error.response.status === 400) {
				toast(error.response.data.message, {
					position: "bottom-right",
				});
			}
		}
		return Promise.reject(error);
	}
);

export { AxiosDashboard, AxiosWeb };
