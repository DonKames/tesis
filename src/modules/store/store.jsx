import thunk from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../auth/authSlice';
import { locationsSlice } from '../locations/slice/locationsSlice';
import { productsSlice } from '../products/slice/productsSlice';
import { usersSlice } from '../users/slice/usersSlice';
import { resetSlice } from '../../shared/resetSlice';
import { settingsSlice } from '../settings/slice/settingsSlice';
import { uiSlice } from '../../shared/ui/slice/uiSlice';
import { movementsSlice } from '../movements/movementSlice';
// import { movementSlice } from '../movements/movementSlice';

const middleware = [thunk];

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        locations: locationsSlice.reducer,
        movements: movementsSlice.reducer,
        products: productsSlice.reducer,
        settings: settingsSlice.reducer,
        ui: uiSlice.reducer,
        users: usersSlice.reducer,

        // Reset state
        reset: resetSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
});
