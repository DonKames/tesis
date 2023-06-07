import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';
import { reset } from '../../../shared/resetSlice';

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
    extraReducers: (builder) => {
        builder.addCase(reset, () => {
            return initialState;
        });
    },
});
export const { productsSetProducts, productsSetSkus } = productsSlice.actions;
export default productsSlice.reducer;
