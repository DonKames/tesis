import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';
import { reset } from '../../../shared/resetSlice';

const initialState = {
    productQty: 0,
    products: [],
    skus: [],
};

export const productsSlice = createSlice({
    name: types.products,
    initialState,
    reducers: {
        // ProductQty
        productsSetProductQty: (state, action) => ({
            ...state,
            productQty: action.payload,
        }),

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
export const { productsSetProductQty, productsSetProducts, productsSetSkus } =
    productsSlice.actions;
export default productsSlice.reducer;
