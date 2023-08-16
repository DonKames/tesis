import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../../types/types';
import { reset } from '../../../shared/resetSlice';

const initialState = {
    usersQty: null,
    users: [],
    roles: [],
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

        // Users Qty
        usersSetUsersQty: (state, action) => ({
            ...state,
            usersQty: action.payload,
        }),

        // Roles
        usersSetRoles: (state, action) => ({
            ...state,
            roles: action.payload,
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(reset, () => {
            return initialState;
        });
    },
});
export const { usersSetUsers, usersSetUsersQty, usersSetRoles } =
    usersSlice.actions;
export default usersSlice.reducer;
