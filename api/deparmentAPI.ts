import axios, { AxiosResponse } from 'axios';

interface Department {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3333', 
});

export const getDepartments = async (): Promise<Department[] | null> => {
  try {
    const response: AxiosResponse<Department[]> = await api.get('/departments');
    return response.data;
  } catch (error) {
    console.error('Error getting departments', error);
    return null;
  }
};

export const getDepartment = async (id: number): Promise<Department | null> => {
  try {
    const response: AxiosResponse<Department> = await api.get(`/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting department with id ${id}`, error);
    return null;
  }
};

export const createDepartment = async (data: Department): Promise<Department | null> => {
  try {
    const response: AxiosResponse<Department> = await api.post('/departments', data);
    return response.data;
  } catch (error) {
    console.error('Error creating department', error);
    return null;
  }
};

export const updateDepartment = async (id: number, data: Department): Promise<Department | null> => {
  try {
    const response: AxiosResponse<Department> = await api.put(`/departments/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating department with id ${id}`, error);
    return null;
  }
};

export const deleteDepartment = async (id: number): Promise<Department | null> => {
  try {
    const response: AxiosResponse<Department> = await api.delete(`/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting department with id ${id}`, error);
    return null;
  }
};
