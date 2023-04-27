import React from 'react';
import { Route, Routes } from 'react-router';
import { AddProductsScreen } from '../components/AddProductsScreen';
import ProductsScreen from '../components/ProductsScreen';

export const ProductsRouter = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={<ProductsScreen />}
            />
            <Route
                path='add'
                element={<AddProductsScreen />}
            />
        </Routes>
    );
};
