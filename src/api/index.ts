import axios, { AxiosRequestConfig } from 'axios';

import { colorTypes } from 'components/Icon/types';

const baseURL: string = process.env.REACT_APP_SERVER_URL
  ? `${process.env.REACT_APP_SERVER_URL}/api`
  : 'http://localhost:8080/api';

export const sendRequest = async (options: AxiosRequestConfig) => {
  return axios({
    baseURL,
    ...options,
    withCredentials: true, // send 'stackSessionId' cookie
  });
};

export const userColors: colorTypes[] = [
  'green',
  'blue',
  'dim-grey',
  'red',
  'golden',
  'teal',
  'orange',
  'green-yellow',
  'lawn-green',
  'yellow',
  'orange-red',
  'aquamarine',
  'black',
];
