import api from './api';

export const fetchAllLeaves = async () => {
  const response = await api.get('/leave/all');
  return response.data;
};

export const fetchLeaveById = async (id: string) => {
  const response = await api.get(`/leave/${id}`);
  return response.data;
};

export const updateLeaveStatus = async (
    leaveId: string,
    status: string,
    note: string
  ) => {
    const response = await api.post(`/leave/status/${leaveId}`, {
      status,
      note,
    });
    return response.data;
  };