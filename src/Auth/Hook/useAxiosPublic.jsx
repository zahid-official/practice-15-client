import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://clearify-server.vercel.app",
  withCredentials: true, // <--- Important for cookies
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;