import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';
import { reset } from '../../../shared/resetSlice';

const initialState = {
    productsQty: null,
    products: [],
    skusQty: null,
    skus: [],
    productsCountByWarehouse: [],
};

export const productsSlice = createSlice({
    name: types.products,
    initialState,
    reducers: {
        // ProductQty
        productsSetProductQty: (state, action) => ({
            ...state,
            productsQty: action.payload,
        }),

        // Products
        productsSetProducts: (state, action) => ({
            ...state,
            products: action.payload,
        }),

        // SkusQty
        productsSetSkusQty: (state, action) => ({
            ...state,
            skusQty: action.payload,
        }),

        // Skus
        productsSetSkus: (state, action) => ({
            ...state,
            skus: action.payload,
        }),

        // ProductsCountByWarehouse
        productsSetProductsCountByWarehouse: (state, action) => ({
            ...state,
            productsCountByWarehouse: action.payload,
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(reset, () => {
            return initialState;
        });
    },
});
export const {
    productsSetProductQty,
    productsSetProducts,
    productsSetSkusQty,
    productsSetSkus,
    productsSetProductsCountByWarehouse,
} = productsSlice.actions;
export default productsSlice.reducer;
