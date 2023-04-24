import React from 'react';
import { Route, Routes } from 'react-router';
import { MainScreen } from '../main/MainScreen';
import { Layout } from '../ui/Layout';

export const PrivateRouter = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={<Layout />}
            >
                <Route
                    path='main'
                    element={<MainScreen />}
                />
            </Route>
        </Routes>
    );
};
