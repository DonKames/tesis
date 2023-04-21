import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../types/types';

const initialState = {
    loading: false,
    msgError: null,
};

export const uiSlice = createSlice({
    name: types.ui,
    initialState,
    reducers: {
        uiSetError: (state, action) => ({
            ...state,
            msgError: action.payload,
        }),
        uiRemoveError: (state, action) => ({
            ...state,
            msgError: null,
        }),
        uiStartLoading: (state, action) => ({
            ...state,
            loading: true,
        }),
        uiFinishLoading: (state, action) => ({
            ...state,
            loading: false,
        }),
    },
});

export const { uiSetError, uiRemoveError, uiStartLoading, uiFinishLoading } =
    uiSlice.actions;

export default uiSlice.reducer;
