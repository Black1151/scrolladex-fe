import axios, { AxiosResponse } from 'axios';
import { camelCase, snakeCase, mapKeys, isObject } from "lodash";

const toSnakeCase = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(item => toSnakeCase(item));
  } else if (isObject(data)) {
    return mapKeys(data, (_, key) => snakeCase(key));
  } else {
    return data;
  }
};

const toCamelCase = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(item => toCamelCase(item));
  } else if (isObject(data)) {
    return mapKeys(data, (_, key) => camelCase(key));
  } else {
    return data;
  }
};

const apiClient = axios.create({
  baseURL: 'http://localhost:3333',
});

apiClient.interceptors.request.use((request) => {
  if (request.data) {
    request.data = toSnakeCase(request.data);
  }
  return request;
});

apiClient.interceptors.response.use((response: AxiosResponse) => {
  if (response.data) {
    response.data = toCamelCase(response.data);
  }
  return response;
});

export default apiClient;
