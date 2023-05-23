import apiClient from './apiClient';
import { Employee, EmployeeOverview, EmployeeCreateUpdate } from '../types';

export const getEmployeesAPI = async (): Promise<Employee[] | null> => {
  try {
    const response = await apiClient.get<Employee[]>('/employees');
    return response.data;
  } catch (error) {
    console.error('Error getting employees', error);
    return null;
  }
};

export const getEmployeesOverviewAPI = async (): Promise<EmployeeOverview[] | null> => {
  try {
    const response = await apiClient.get<EmployeeOverview[]>('/employees/overview');
    return response.data;
  } catch (error) {
    console.error('Error getting employees overview', error);
    return null;
  }
};

export const getEmployeeAPI = async (id: number): Promise<Employee | null> => {
  try {
    const response = await apiClient.get<Employee>(`/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting employee with id ${id}`, error);
    return null;
  }
};

export const createEmployeeAPI = async (data: EmployeeCreateUpdate): Promise<number | null> => {
  try {
    const response = await apiClient.post<Employee>('/employees', data);
    return response.status;
  } catch (error) {
    console.error('Error creating employee', error);
    return null;
  }
};

export const updateEmployeeAPI = async (data: EmployeeCreateUpdate): Promise<Employee | null> => {
  try {
    const response = await apiClient.put<Employee>(`/employees/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with id ${data.id}`, error);
    return null;
  }
};

export const deleteEmployeeAPI = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/employees/${id}`);
  } catch (error) {
    console.error(`Error deleting employee with id ${id}`, error);
  }
};
