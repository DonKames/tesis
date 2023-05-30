import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';

const initialState = {
    products: [],
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
    },
});
export const { productsSetProducts } = productsSlice.actions;
export default productsSlice.reducer;
