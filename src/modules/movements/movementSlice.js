import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../types/types';
import { reset } from '../../shared/resetSlice';

const initialState = {
    movements: [],
    lastAdded: [],
};

export const movementsSlice = createSlice({
    name: types.movements,
    initialState,
    reducers: {
        movementsSetData: (state, action) => {
            if (action.payload.movements) {
                state.movements = action.payload.movements;
            }

            if (action.payload.lastAdded) {
                state.lastAdded = action.payload.lastAdded;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(reset, () => {
            return initialState;
        });
    },
});

export const { movementsSetData } = movementsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth

export default movementsSlice.reducer;
