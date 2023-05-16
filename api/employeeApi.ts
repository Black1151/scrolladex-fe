import axios, { AxiosResponse } from 'axios';

interface Employee {
  id?: number;
  title: string;
  firstName: string;
  lastName: string;
  empNo: string;
  jobTitle: string;
  departmentId: number;
  telephone: string;
  email: string;
  profilePicture: string;
  created_at?: string;
  updated_at?: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3333', 
});

export const getEmployees = async (): Promise<Employee[] | null> => {
  try {
    const response: AxiosResponse<Employee[]> = await api.get('/employees');
    return response.data;
  } catch (error) {
    console.error('Error getting employees', error);
    return null;
  }
};

export const getEmployee = async (id: number): Promise<Employee | null> => {
  try {
    const response: AxiosResponse<Employee> = await api.get(`/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting employee with id ${id}`, error);
    return null;
  }
};

export const createEmployee = async (data: Employee): Promise<Employee | null> => {
  try {
    const response: AxiosResponse<Employee> = await api.post('/employees', data);
    return response.data;
  } catch (error) {
    console.error('Error creating employee', error);
    return null;
  }
};

export const updateEmployee = async (id: number, data: Employee): Promise<Employee | null> => {
  try {
    const response: AxiosResponse<Employee> = await api.put(`/employees/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with id ${id}`, error);
    return null;
  }
};

export const deleteEmployee = async (id: number): Promise<Employee | null> => {
  try {
    const response: AxiosResponse<Employee> = await api.delete(`/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting employee with id ${id}`, error);
    return null;
  }
};
