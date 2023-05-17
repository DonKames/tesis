import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';

const initialState = {
    countries: [],
    regions: [],
};

export const locationsSlice = createSlice({
    name: types.locations,
    initialState,
    reducers: {
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
    },
});
export const { locationsSetRegions, locationsSetCountries } =
    locationsSlice.actions;
export default locationsSlice.reducer;
