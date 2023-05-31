import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3001",
});

export default Axios;