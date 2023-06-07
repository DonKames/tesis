import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../types/types';
import { reset } from '../resetSlice';

const initialState = {
    loading: false,
    msgError: null,
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
    },
    extraReducers: (builder) => {
        builder.addCase(reset, () => {
            return initialState;
        });
    },
});

export const { uiSetError, uiRemoveError, uiStartLoading, uiFinishLoading } =
    uiSlice.actions;

export default uiSlice.reducer;
