import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {LandingPage} from "./pages/";
import "../index.css";
const Static = () => {
    return (
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
    );
};

export default Static;
