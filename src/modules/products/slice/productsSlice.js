import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';

const initialState = {
    products: [],
    skus: [],
};

export const productsSlice = createSlice({
    name: types.products,
    initialState,
    reducers: {
        // Products
        productsSetProducts: (state, action) => ({
            ...state,
            products: action.payload,
        }),

        // Skus
        productsSetSkus: (state, action) => ({
            ...state,
            skus: action.payload,
        }),
    },
});
export const { productsSetProducts, productsSetSkus } = productsSlice.actions;
export default productsSlice.reducer;
