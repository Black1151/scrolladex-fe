import axios, { AxiosResponse } from 'axios';
import { camelCase, snakeCase, mapKeys, isObject } from "lodash";

const convertKeys = (data: any, converter: (key: string) => string): any => {
  if (Array.isArray(data)) {
    return data.map(item => convertKeys(item, converter));
  } else if (isObject(data)) {
    return mapKeys(data, (_, key) => converter(key));
  } else {
    return data;
  }
};

const isFile = (item: any): item is File => item instanceof File;
const isBlob = (item: any): item is Blob => item instanceof Blob;

const convertToFormData = (data: any): FormData => {
  const formData = new FormData();
  for (const key in data) {
    if (isFile(data[key]) || isBlob(data[key])) {
      formData.append(key, data[key]);
    } else if (typeof data[key] === "number") {
      formData.append(key, data[key].toString());
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

const containsFileOrBlob = (data: any): boolean => {
  for (const key in data) {
    if (isFile(data[key]) || isBlob(data[key])) {
      return true;
    }
  }
  return false;
};

const handleFormData = async (request: any) => {
  try {
    if (request.data) {
      const data = convertKeys(request.data, snakeCase);
      if (containsFileOrBlob(data)) {
        request.data = convertToFormData(data);
      } else {
        request.data = data;
      }
    }
    return request;
  } catch (error) {
    console.error('Error in request interceptor:', error);
    throw error; 
  }
}

const apiClient = axios.create({
  baseURL: 'http://localhost:3333',
});

apiClient.interceptors.request.use(handleFormData);

apiClient.interceptors.response.use((response: AxiosResponse) => {
  if (response.data) {
    response.data = convertKeys(response.data, camelCase);
  }
  return response;
});

export default apiClient;
