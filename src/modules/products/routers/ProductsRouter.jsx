import React from 'react';
import { Route, Routes } from 'react-router';
import { AddProductsScreen } from '../components/AddProductsScreen';
import ProductsScreen from '../components/ProductsScreen';
import useHasAccess from '../../../shared/hooks/useHasAccess';
import { UnauthorizedAccess } from '../../../shared/ui/components/UnauthorizedAccess';

export const ProductsRouter = () => {
    const hasAccess = useHasAccess([1, 2]);

    // console.log(hasAccess);
    return (
        <Routes>
            <Route path="/" element={<ProductsScreen />} />
            {hasAccess ? (
                <Route path="add" element={<AddProductsScreen />} />
            ) : (
                <Route path="*" element={<UnauthorizedAccess />} />
            )}
        </Routes>
    );
};
