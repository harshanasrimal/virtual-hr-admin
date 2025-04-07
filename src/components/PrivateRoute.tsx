import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { token, user,loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Checking access...</div>;
  }

  if(token && user?.role === 'HR') {
    return children;
  } else{
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
