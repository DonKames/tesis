import { createSlice } from '@reduxjs/toolkit';

export const resetSlice = createSlice({
    name: 'reset',
    initialState: {},
    reducers: {
        reset: () => {},
    },
});

export const { reset } = resetSlice.actions;
export default resetSlice.reducer;
