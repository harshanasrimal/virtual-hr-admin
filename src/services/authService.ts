import api from './api';

export const loginAdmin = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};
