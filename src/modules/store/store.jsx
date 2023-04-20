import thunk from 'redux-thunk'

//import { authReducer } from "../reducers/authReducer";
//import { warehouseReducer } from "../reducers/modules/warehouseReducer";
//import { notesReducer } from "../reducers/notesReducer";
//import { uiReducer } from "../reducers/uiReducer";
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../auth/authSlice'

const middleware = [thunk]

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
})
