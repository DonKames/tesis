import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';
import { reset } from '../../../shared/resetSlice';

const initialState = {
    countries: [],
    regions: [],
    branches: [],
    branchesQty: null,
    warehouses: [],
    warehousesNames: [],
    warehousesQty: null,
    branchLocations: [],
    branchLocationsQty: null,
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
    locationsSetRegions,
    locationsSetWarehousesQty,
    locationsSetWarehouses,
} = locationsSlice.actions;

export default locationsSlice.reducer;
