import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/twist_digital_blog/api",
  withCredentials: true,
});
