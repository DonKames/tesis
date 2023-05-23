import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';

const initialState = {
    countries: [],
    regions: [],
    branches: [],
    warehouses: [],
    branchLocations: [],
};

export const locationsSlice = createSlice({
    name: types.locations,
    initialState,
    reducers: {
        // Branches
        locationsSetBranches: (state, action) => ({
            ...state,
            branches: action.payload,
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

        // Warehouses
        locationsSetWarehouses: (state, action) => ({
            ...state,
            warehouses: action.payload,
        }),
    },
});
export const {
    locationsSetBranches,
    locationsSetBranchLocations,
    locationsSetCountries,
    locationsSetRegions,
    locationsSetWarehouses,
} = locationsSlice.actions;
export default locationsSlice.reducer;
