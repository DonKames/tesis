import React from 'react';
import { Route, Routes } from 'react-router';
import { MainScreen } from '../main/components/MainScreen';
import { Layout } from '../ui/Layout';
import { TasksScreen } from '../task/TasksScreen';
import { DashboardScreen } from '../dashboard/components/DashboardScreen';
import { ProductsRouter } from '../products/routers/ProductsRouter';
import MerchantApiTest from '../../tests/MerchantApiTest';

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
                <Route
                    path='tasks'
                    element={<TasksScreen />}
                />
                <Route
                    path='products/*'
                    element={<ProductsRouter />}
                />
                <Route
                    path='dashboard'
                    element={<DashboardScreen />}
                />
                <Route
                    path='test'
                    element={<MerchantApiTest />}
                />
            </Route>
        </Routes>
    );
};
