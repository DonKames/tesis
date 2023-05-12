import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';

const initialState = {
    regions: [],
};

export const locationsSlice = createSlice({
    name: types.locations,
    initialState,
    reducers: {
        locationsSetRegions: (state, action) => ({
            ...state,
            regions: action.payload,
        }),
    },
});
export const { locationsSetRegions } = locationsSlice.actions;
export default locationsSlice.reducer;
