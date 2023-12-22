import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_serverUrl,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
