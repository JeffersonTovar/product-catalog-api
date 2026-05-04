import axios from "axios";

console.log("ENV:", import.meta.env.VITE_API_URL);
const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api"
});
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;
