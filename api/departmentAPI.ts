import axios, { AxiosResponse } from 'axios';

interface Department {
  id?: number;
  departmentName: string;
  addressLineOne: string;
  addressLineTwo?: string;
  town: string;
  county: string;
  postcode: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3333', 
});

export const getDepartmentsAPI = async (): Promise<Department[] | null> => {
  try {
    const response: AxiosResponse<Department[]> = await api.get('/departments');
    return response.data;
  } catch (error) {
    console.error('Error getting departments', error);
    return null;
  }
};

export const getDepartmentAPI = async (id: number): Promise<Department | null> => {
  try {
    const response: AxiosResponse<Department> = await api.get(`/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting department with id ${id}`, error);
    return null;
  }
};

export const createDepartmentAPI = async (data: Department): Promise<null | number> => {
  try {
    const response: AxiosResponse<Department> = await api.post('/departments', data);
    return response.status;
  } catch (error) {
    console.error('Error creating department', error);
    return null;
  }
};

export const updateDepartmentAPI = async (id: number, data: Department): Promise<Department | null> => {
  try {
    const response: AxiosResponse<Department> = await api.put(`/departments/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating department with id ${id}`, error);
    return null;
  }
};

export const deleteDepartmentAPI = async (id: number): Promise<Department | null> => {
  try {
    const response: AxiosResponse<Department> = await api.delete(`/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting department with id ${id}`, error);
    return null;
  }
};
