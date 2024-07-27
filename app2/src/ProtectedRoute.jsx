import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>; // Optionally handle loading state
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

