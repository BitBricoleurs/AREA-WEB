import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {DashboardPage, LoginPage} from './pages';
import { PrivateRoute } from '../components';
import "../index.css";

const App = () => {
    return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                {/* Route Protected */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
    );
};

export default App;
