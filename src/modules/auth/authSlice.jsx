import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../types/types';
import { reset } from '../../shared/resetSlice';

const initialState = {
    isLoggedIn: false,
    uid: null,
    displayName: null,
    // img: null,
    email: null,
    isRegistered: false,
    role: null,
};

export const authSlice = createSlice({
    name: types.auth,
    initialState,
    reducers: {
        authLogin: (state, action) => {
            // state.isLoggedIn = true;
            // state.uid = action.payload.uid;
            // state.displayName = action.payload.displayName;
            // state.email = action.payload.email;
            // state.role = action.payload.role;
            // state.isRegistered = action.payload.isRegistered;
            console.log(action.payload);
            state.isLoggedIn = true;
            if (action.payload.uid !== undefined) {
                state.uid = action.payload.uid;
            }
            if (action.payload.displayName !== undefined) {
                state.displayName = action.payload.displayName;
            }
            if (action.payload.email !== undefined) {
                state.email = action.payload.email;
            }
            if (action.payload.role !== undefined) {
                state.role = action.payload.role;
            }
            if (action.payload.isRegistered !== undefined) {
                state.isRegistered = action.payload.isRegistered;
            }
        },
        authLogout: () => {
            return initialState;
        },
        authIsRegistered: (state, action) => {
            state.isRegistered = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(reset, () => {
            return initialState;
        });
    },
});

export const { authLogin, authLogout, authIsRegistered } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth

export default authSlice.reducer;
