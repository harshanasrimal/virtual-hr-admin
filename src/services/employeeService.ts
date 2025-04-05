import api from './api';

export const getAllEmployees = async () => {
  const res = await api.get('/employee/all');
  return res.data;
};

export const createEmployee = async (data: any) => {
  const res = await api.post('/employee/new', data);
  return res.data;
};
