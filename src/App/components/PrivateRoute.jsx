import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    return localStorage.getItem('userToken') !== null;
};

const PrivateRoute = ({ children }) => {
    return children;
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;