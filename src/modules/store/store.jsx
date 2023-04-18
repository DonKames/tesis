import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

//import { authReducer } from "../reducers/authReducer";
//import { warehouseReducer } from "../reducers/modules/warehouseReducer";
//import { notesReducer } from "../reducers/notesReducer";
//import { uiReducer } from "../reducers/uiReducer";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/authSlice";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const reducers = combineReducers({
//     reducer: {
//         auth: authSlice.reducer,
//     }
//     //auth: authReducer,
//     //ui: uiReducer,
//     //warehouse: warehouseReducer,
// });

export const store = configureStore({
        reducer: {
            auth: authSlice,
        }
    }
)

//DEPRECATED
// export const store = createStore(
//     reducers,
//     composeEnhancers(
//         applyMiddleware(thunk)
//     )
// );