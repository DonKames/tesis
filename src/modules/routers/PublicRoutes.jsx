import React from 'react';

import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthRouter } from './AuthRouter';

export const PublicRoutes = ({ isLoggedIn }) => {
    return isLoggedIn ? <Navigate to='../pvt/main' /> : <AuthRouter />;
};

PublicRoutes.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};
