// apiClient.ts
import axios, { AxiosResponse } from 'axios';
import { camelCase, snakeCase, mapKeys, isObject } from "lodash";

const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item));
  } else if (isObject(obj)) {
    return mapKeys(obj, (key) => camelCase(key));
  } else {
    return obj;
  }
};

const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => toSnakeCase(item));
  } else if (isObject(obj)) {
    return mapKeys(obj, (key) => snakeCase(key));
  } else {
    return obj;
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
