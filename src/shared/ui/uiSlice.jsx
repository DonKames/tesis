import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../types/types';

const initialState = {
    loading: false,
    msgError: null,
    countries: [],
};

export const uiSlice = createSlice({
    name: types.ui,
    initialState,
    reducers: {
        // Error
        uiSetError: (state, action) => ({
            ...state,
            msgError: action.payload,
        }),
        uiRemoveError: (state, action) => ({
            ...state,
            msgError: null,
        }),

        // Loading
        uiStartLoading: (state, action) => ({
            ...state,
            loading: true,
        }),
        uiFinishLoading: (state, action) => ({
            ...state,
            loading: false,
        }),

        // Countries
        uiSetCountries: (state, action) => ({
            ...state,
            countries: action.payload,
        }),
    },
});

export const {
    uiSetError,
    uiRemoveError,
    uiStartLoading,
    uiFinishLoading,
    uiSetCountries,
} = uiSlice.actions;

export default uiSlice.reducer;
