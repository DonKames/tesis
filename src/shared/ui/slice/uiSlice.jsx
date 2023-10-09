import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';
import { reset } from '../../resetSlice';

const initialState = {
    loading: false,
    msgError: null,

    // Selects options
    branchesNames: [],
    skusNames: [],
    warehousesNames: [],
    countries: [],
    regions: [],
    municipalities: [],
    roles: [],
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

        // Selects options
        uiSetBranchesNames: (state, action) => ({
            ...state,
            branchesNames: action.payload,
        }),
        uiSetSkusNames: (state, action) => ({
            ...state,
            skusNames: action.payload,
        }),
        uiSetWarehousesNames: (state, action) => ({
            ...state,
            warehousesNames: action.payload,
        }),
        uiSetCountries: (state, action) => ({
            ...state,
            countries: action.payload,
        }),
        uiSetRegions: (state, action) => ({
            ...state,
            regions: action.payload,
        }),
        uiSetMunicipalities: (state, action) => ({
            ...state,
            municipalities: action.payload,
        }),
        uiSetRoles: (state, action) => ({
            ...state,
            roles: action.payload,
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(reset, () => {
            return initialState;
        });
    },
});

export const {
    uiSetError,
    uiRemoveError,
    uiStartLoading,
    uiFinishLoading,
    uiSetBranchesNames,
    uiSetCountries,
    uiSetRegions,
    uiSetSkusNames,
    uiSetWarehousesNames,
    uiSetMunicipalities,
    uiSetRoles,
} = uiSlice.actions;

export default uiSlice.reducer;
