import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';
import { reset } from '../../resetSlice';

const initialState = {
    loading: false,
    msgError: null,

    // Selects options
    branchesNames: [],
    countries: [],
    municipalities: [],
    regions: [],
    roles: [],
    skusNames: [],
    usersNames: [],
    warehousesNames: [],
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
        uiSetUsersNames: (state, action) => ({
            ...state,
            usersNames: action.payload,
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(reset, () => {
            return initialState;
        });
    },
});

export const {
    uiFinishLoading,
    uiRemoveError,
    uiSetBranchesNames,
    uiSetCountries,
    uiSetError,
    uiSetMunicipalities,
    uiSetRegions,
    uiSetRoles,
    uiSetSkusNames,
    uiSetUsersNames,
    uiSetWarehousesNames,
    uiStartLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
