import axios from "axios";
import { toast } from "react-toastify";

const AxiosDashboard = axios.create({
	//baseURL: "https://estate-cetz.onrender.com/dashboard",
	baseURL: "http://3bsi.nader-mo.tech/dashboard",
});

const AxiosWeb = axios.create({
	//baseURL: "https://estate-cetz.onrender.com",
	baseURL: "http://3bsi.nader-mo.tech",
});

AxiosWeb.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
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
	});

	AxiosWeb.interceptors.response.use(
		(response) => response,
		(error) => {
			console.log(error.response.data.error);
			if (error.response) {
				if (error.response.status === 403) {
					let i = 1;
					error.response.data.error.forEach((element) => {
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
