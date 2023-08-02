import React from 'react';
import { useAuth } from '../../context/useAuth';
import { useLocation, Outlet, Navigate } from 'react-router-dom';

export const RequireAuth = () => {

    const { auth } = useAuth();
    const location = useLocation();

  return (
    auth != null ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
  )
}
