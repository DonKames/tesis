import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';

export const PublicRoutes = ({ isLoggedIn }) => {
    return isLoggedIn ? <Navigate to='/' /> : <AuthRouter />;
};
