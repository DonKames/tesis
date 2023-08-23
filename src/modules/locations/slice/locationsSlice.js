import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';
import { reset } from '../../../shared/resetSlice';

const initialState = {
    branches: [],
    branchesQty: null,
    branchesNames: [],
    branchLocations: [],
    branchLocationsQty: null,
    countries: [],
    mainWarehouse: null,
    regions: [],
    warehouses: [],
    warehousesNames: [],
    warehousesQty: null,
};

export const locationsSlice = createSlice({
    name: types.locations,
    initialState,
    reducers: {
        // BranchesQty
        locationsSetBranchesQty: (state, action) => ({
            ...state,
            branchesQty: action.payload,
        }),

        // Branches
        locationsSetBranches: (state, action) => ({
            ...state,
            branches: action.payload,
        }),

        // Branches Names
        locationsSetBranchesNames: (state, action) => ({
            ...state,
            branchesNames: action.payload,
        }),

        // Branch Locations Qty
        locationsSetBranchLocationsQty: (state, action) => ({
            ...state,
            branchLocationsQty: action.payload,
        }),

        // Branch Locations
        locationsSetBranchLocations: (state, action) => ({
            ...state,
            branchLocations: action.payload,
        }),

        // Countries
        locationsSetCountries: (state, action) => ({
            ...state,
            countries: action.payload,
        }),

        // Main Warehouse
        locationsSetMainWarehouse: (state, action) => ({
            ...state,
            mainWarehouse: action.payload,
        }),

        // Regions
        locationsSetRegions: (state, action) => ({
            ...state,
            regions: action.payload,
        }),

        // Warehouses Qty
        locationsSetWarehousesQty: (state, action) => ({
            ...state,
            warehousesQty: action.payload,
        }),

        // Warehouses
        locationsSetWarehouses: (state, action) => ({
            ...state,
            warehouses: action.payload,
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(reset, () => {
            return initialState;
        });
    },
});
export const {
    locationsSetBranchesQty,
    locationsSetBranches,
    locationsSetBranchLocationsQty,
    locationsSetBranchLocations,
    locationsSetCountries,
    locationsSetMainWarehouse,
    locationsSetRegions,
    locationsSetWarehousesQty,
    locationsSetWarehouses,
} = locationsSlice.actions;

export default locationsSlice.reducer;
