import React from 'react';
import { Navigate } from 'react-router';
import { PrivateRouter } from './PrivateRouter';

export const PrivateRoutes = ({ isLoggedIn }) => {
    return isLoggedIn ? <PrivateRouter /> : <Navigate to='../pbl/login' />;
};
