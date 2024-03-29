import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from "react-router-dom";

const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
    const [user, setUser] = useState('Account');
    const [isLoading, setIsLoading] = useState(false);
    const [ip, setIp] = useState(import.meta.env.VITE_REACT_APP_API_URL);


    const navigate = useNavigate();

    const login = (username, authToken) => {
        setUser(username);
        localStorage.setItem('userToken', authToken);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userToken');
        navigate('/auth');
    };

    const tokenExists = () => {
        return localStorage.getItem('userToken') !== null;
    };

    const getMe = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${ip}me`, {
                method: 'GET',
                headers: {
                    "ngrok-skip-browser-warning": true,
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            return data;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginContext.Provider
            value={{
                user,
                isLoading,
                getMe,
                login,
                logout,
                tokenExists,
                ip,
                setIp,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export const useContextLogin = () => {
    const context = useContext(LoginContext);
    if (context === undefined) {
        throw new Error('Context must be used within a context provider');
    }
    return context;
};
