import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';
import { reset } from '../../../shared/resetSlice';

const initialState = {
    globalSettingsId: null,
    mainBranch: null,
    mainWarehouse: null,
};

export const settingsSlice = createSlice({
    name: types.settings,
    initialState,
    reducers: {
        // GlobalSettingsId
        settingsSetGlobalSettingsId: (state, action) => ({
            ...state,
            globalSettingsId: action.payload,
        }),

        // MainBranch
        settingsSetMainBranch: (state, action) => ({
            ...state,
            mainBranch: action.payload,
        }),

        // MainWarehouse
        settingsSetMainWarehouse: (state, action) => ({
            ...state,
            mainWarehouse: action.payload,
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(reset, () => {
            return initialState;
        });
    },
});

export const {
    settingsSetMainWarehouse,
    settingsSetMainBranch,
    settingsSetGlobalSettingsId,
} = settingsSlice.actions;
export default settingsSlice.reducer;
