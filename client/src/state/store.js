import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../views/auth/authSlice.js";
import {authApi} from "../views/auth/authApi.js";
import {setupListeners} from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
    authReducer: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    // another: anotherReducer,
    // Add more reducers here if needed
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);