import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isProfileUpdating: false,
    updateError: null,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateProfileStart: (state) => {
      state.isProfileUpdating = true;
      state.updateError = null;
    },
    updateProfileSuccess: (state, action) => {
        state.isProfileUpdating = false;
        state.user = action.payload; 
    },
    updateProfileFailure: (state, action) => {
        state.isProfileUpdating = false;
        state.updateError = action.payload;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateProfileStart, 
  updateProfileSuccess, 
  updateProfileFailure 
} = authSlice.actions;
export default authSlice.reducer;