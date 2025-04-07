import api from './api';

export const getPendingLeaveCount = async () => {
  const res = await api.get('/leave/pending/count');
  return res.data.count;
};

export const getRecentLeaveRequests = async () => {
  const res = await api.get('/leave/recent?limit=3');
  return res.data;
};

export const getMonthlyApprovedLeaves = async (year: number) => {
  const res = await api.get(`/leave/approved/monthly?year=${year}`);
  return res.data;
};

export const getPendingDocumentCount = async () => {
  const res = await api.get('/document/pending/count');
  return res.data.count;
};

export const getRecentDocumentRequests = async () => {
  const res = await api.get('/document/recent?limit=3');
  return res.data;
};
