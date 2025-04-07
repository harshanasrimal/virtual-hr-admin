import api from './api';

export const getAllEmployees = async () => {
  const res = await api.get('/employee/all');
  return res.data;
};

export const createEmployee = async (data: any) => {
  const res = await api.post('/employee/new', data);
  return res.data;
};

export const getEmployeeById = async (id: string) => {
  const res = await api.get(`/employee/${id}`);
  return res.data;
};
export const updateEmployee = async (id: string, data: any) => {
  const res = await api.patch(`/employee/${id}`, data);
  return res.data;
}

export const updateProfilePicture = async (
    id: string,
    file: File
  ) => {
    const formData = new FormData();
    if (!file) {
        throw new Error('No file provided');
    }
    formData.append('file', file);
  
    const res = await api.post(`/employee/image/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return res.data;
  };