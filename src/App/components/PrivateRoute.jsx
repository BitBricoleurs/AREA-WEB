import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContextLogin} from "../context/loginContext.jsx";

const isAuthenticated = () => {

    const { tokenExists } = useContextLogin();
    return tokenExists();
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
