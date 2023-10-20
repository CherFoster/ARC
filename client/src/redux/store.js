import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from './checkSession';

export default configureStore({
    reducer: {
        session: sessionReducer,
    }
})