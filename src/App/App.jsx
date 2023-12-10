import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {DashboardPage, SearchPage, AutomatePage, AnalyticsPage, SettingsPage, AuthPage} from './pages';
import { PrivateRoute } from '../components';
import "../index.css";

const App = () => {
    return (
            <>
                <Routes>
                <Route path="/auth" element={<AuthPage />} />
                {/* Route Protected */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage/>
                        </PrivateRoute>
                    }
                />
                    <Route
                        path="/search"
                        element={
                            <PrivateRoute>
                                <SearchPage/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/automate"
                        element={
                            <PrivateRoute>
                                <AutomatePage/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/analytics"
                        element={
                            <PrivateRoute>
                                <AnalyticsPage/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute>
                                <SettingsPage/>
                            </PrivateRoute>
                        }
                    />
                <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </>
    );
};

export default App;
