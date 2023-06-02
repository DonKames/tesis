import thunk from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../auth/authSlice';
import { uiSlice } from '../../shared/ui/uiSlice';
import { locationsSlice } from '../locations/slice/locationsSlice';
import { productsSlice } from '../products/slice/productsSlice';
import { usersSlice } from '../users/slice/usersSlice';

const middleware = [thunk];

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        locations: locationsSlice.reducer,
        products: productsSlice.reducer,
        users: usersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
});
