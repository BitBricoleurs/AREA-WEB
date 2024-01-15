import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {DashboardPage, SearchPage, AutomatePage, AnalyticsPage, SettingsPage, AuthPage} from './pages';
import { PrivateRoute} from '../App/components/index.js';
import {WorkflowContextProvider} from "/src/App/context/workflowContext";
import {NotificationProvider} from "/src/App/context/notificationContext";
import {NotificationManager} from "/src/App/components";
import "../index.css";

const App = () => {
    return (
        <div className="App bg-background w-full">
            <NotificationProvider>
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
                            <WorkflowContextProvider>
                                <PrivateRoute>
                                    <AutomatePage/>
                                </PrivateRoute>
                            </WorkflowContextProvider>
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
            </NotificationProvider>
            </div>
    );
};

export default App;
