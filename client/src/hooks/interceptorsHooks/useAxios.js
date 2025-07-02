import { useAuthAxios } from "./useAxiosInstance";

const useAxiosSecure = (url, method) => {
  const axios = useAuthAxios();
  const axiosApi = (config = {}, data = {}) => {
    const normalizedMethod = method.toLowerCase();
    let parameters = [data, config];
    if (normalizedMethod === "get") parameters = [config];
    if (normalizedMethod === "delete") parameters = [{ ...config, data }];
    return axios[normalizedMethod](url, ...parameters);
  };
  return { axiosApi };
};

export default useAxiosSecure;
