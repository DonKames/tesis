import thunk from 'redux-thunk'

import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../auth/authSlice'

const middleware = [thunk]

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware)
})
