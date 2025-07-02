import axios from "axios";
import { useAuthContext } from "../../contexts/Auth/AuthContext";

const axiosInstance = axios.create({
  baseURL: "https://open-library-ten.vercel.app",
  withCredentials: true,
});

const useAuthAxios = () => {
  const { signOutUser } = useAuthContext();
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        signOutUser().then(() => {
          console.log("signed out");
        });
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export { useAuthAxios };
