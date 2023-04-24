import React from 'react';

import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

import { PrivateRouter } from './PrivateRouter';

export const PrivateRoutes = ({ isLoggedIn }) => {
    return isLoggedIn ? <PrivateRouter /> : <Navigate to='../pbl/login' />;
};

PrivateRoutes.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};
