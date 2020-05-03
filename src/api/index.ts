import axios, { AxiosRequestConfig } from 'axios';

import { colorTypes } from 'components/Icon/types';

const baseURL: string = process.env.SERVER_URL || 'http://localhost:8080';

export const sendRequest = async (options: AxiosRequestConfig) => {
  return axios({
    baseURL,
    ...options,
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
