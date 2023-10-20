import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from './checkSession';
import authReducer from './authSlice';

export default configureStore({
    reducer: {
        session: sessionReducer,
        auth: authReducer,
    }
})