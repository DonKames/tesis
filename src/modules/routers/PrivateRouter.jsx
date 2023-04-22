import React from 'react';
import { Route, Routes } from 'react-router';
import { MainScreen } from '../main/MainScreen';

export const PrivateRouter = () => {
    return (
        <Routes>
            <Route
                path='main'
                element={<MainScreen />}
            />
        </Routes>
    );
};
