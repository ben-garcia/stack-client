import axios, { AxiosRequestConfig } from 'axios';

const baseURL: string = process.env.SERVER_URL || 'http://localhost:8080';

const sendRequest = async (options: AxiosRequestConfig) => {
  return axios({
    baseURL,
    ...options,
  });
};

export default sendRequest;
