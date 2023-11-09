import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
});

export const {setUser, clearUser} = sessionSlice.actions;
export default sessionSlice.reducer;