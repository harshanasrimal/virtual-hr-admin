import api from './api';

export const getAllDocumentRequests = async () => {
  const res = await api.get('/document/all');
  return res.data;
};

// Update status + upload softcopy PDF
export const updateDocumentStatus = async (
    id: string,
    status: string,
    file: File
  ) => {
    const formData = new FormData();
    formData.append('status', status);
    if (file) {
      formData.append('file', file);
    }
  
    const res = await api.post(`/document/status/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return res.data;
  };