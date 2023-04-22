import React from 'react';
import { Navigate } from 'react-router';

export const PrivateRoutes = ({ isLoggedIn }) => {
    return isLoggedIn ? <Navigate to='' /> : <div></div>;
};
