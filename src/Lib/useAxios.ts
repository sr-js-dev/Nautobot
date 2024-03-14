import axios, { AxiosError, AxiosResponse } from 'axios';

export function useAxios(timeout: number = 500000000) {
  const token = process.env.REACT_APP_API_TOKEN;
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Token ${token}`,
  };
  const config = {
    baseURL: `/api`,
    timeout: timeout,
    headers: headers
  };

  const axiosInstance = axios.create(config);

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      const status = error.response?.status;

      if (status) {
        if (status >= 400 && status <= 500) {
          if (status === 401) {
            return Promise.reject(error.response?.data);
          }
          if (status === 422) {
            return Promise.reject(error.response?.data);
          }
          return Promise.reject(error);
        }
      } else {
        return Promise.reject(error);
      }
    }
  );

  return axiosInstance;
}
