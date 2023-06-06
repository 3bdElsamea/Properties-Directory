import axios from "axios";

const Axios = axios.create({
  baseURL: "http://3bsi.nader-mo.tech/",
});

export default Axios;