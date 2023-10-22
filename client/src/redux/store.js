import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from './checkSession';
import authReducer from './authSlice';
import userProfilesReducer from './userProfiles';

export default configureStore({
    reducer: {
        session: sessionReducer,
        auth: authReducer,
        userProfiles: userProfilesReducer
    }
})