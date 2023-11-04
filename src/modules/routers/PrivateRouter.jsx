import React from 'react';
import { Route, Routes } from 'react-router';
import { MainScreen } from '../main/components/MainScreen';
import { TasksScreen } from '../task/TasksScreen';
import { DashboardScreen } from '../dashboard/components/DashboardScreen';
import { ProductsRouter } from '../products/routers/ProductsRouter';
import MerchantApiTest from '../../tests/MerchantApiTest';
import { LocationsScreen } from '../locations/components/LocationsScreen';
import { UsersScreen } from '../users/components/UsersScreen';
import { SettingsScreen } from '../settings/components/SettingsScreen';
import { Layout } from '../../shared/ui/components/Layout';
import { useSelector } from 'react-redux';
import { UnauthorizedAccess } from '../../shared/ui/components/UnauthorizedAccess';

export const PrivateRouter = () => {
    const { role } = useSelector((state) => state.auth);

    const hasAccess = role === 1 || role === 2;
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="main" element={<MainScreen />} />
                <Route path="tasks" element={<TasksScreen />} />
                <Route path="products/*" element={<ProductsRouter />} />
                {hasAccess ? (
                    <Route path="dashboard" element={<DashboardScreen />} />
                ) : (
                    <Route path="*" element={<UnauthorizedAccess />} />
                )}
                <Route path="locations" element={<LocationsScreen />} />

                {hasAccess ? (
                    <Route path="users" element={<UsersScreen />} />
                ) : (
                    <Route path="*" element={<UnauthorizedAccess />} />
                )}
                {/* <Route path="users" element={<UsersScreen />} /> */}

                <Route path="test" element={<MerchantApiTest />} />
                <Route path="settings" element={<SettingsScreen />} />
            </Route>
        </Routes>
    );
};
