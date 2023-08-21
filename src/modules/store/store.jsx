import thunk from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../auth/authSlice';
import { uiSlice } from '../../shared/ui/uiSlice';
import { locationsSlice } from '../locations/slice/locationsSlice';
import { productsSlice } from '../products/slice/productsSlice';
import { usersSlice } from '../users/slice/usersSlice';
import { resetSlice } from '../../shared/resetSlice';
import { settingsSlice } from '../settings/slice/settingsSlice';

const middleware = [thunk];

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        locations: locationsSlice.reducer,
        products: productsSlice.reducer,
        ui: uiSlice.reducer,
        users: usersSlice.reducer,
        settings: settingsSlice.reducer,

        // Reset state
        reset: resetSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
});
