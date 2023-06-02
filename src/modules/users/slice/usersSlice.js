import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';

const initialState = {
    users: [],
};

export const usersSlice = createSlice({
    name: types.users,
    initialState,
    reducers: {
        // Users
        usersSetUsers: (state, action) => ({
            ...state,
            users: action.payload,
        }),
    },
});
export const { usersSetUsers } = usersSlice.actions;
export default usersSlice.reducer;
