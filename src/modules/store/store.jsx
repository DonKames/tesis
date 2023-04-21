import thunk from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../auth/authSlice';
import { uiSlice } from '../ui/uiSlice';

const middleware = [thunk];

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
});
