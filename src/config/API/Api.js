import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7039/api/", 
});

export default API;
