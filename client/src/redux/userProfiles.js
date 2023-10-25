import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userProfiles = createSlice({
    name: 'userProfiles',
    initialState: {
        profiles: [], // List of all user profiles
        currentProfile: null, // Individual user profile by ID
        error: null
    },
    reducers: {
        // Fetching all user profiles
        fetchUserProfilesBegin: (state) => {
            state.error = null;
        },
        fetchUserProfilesSuccess: (state, action) => {
            state.profiles = action.payload;
            state.error = null;
        },
        fetchUserProfilesFailure: (state, action) => {
            state.error = action.payload;
        },

        // Fetching individual user profile by ID
        fetchUserProfileByIdBegin: (state) => {
            state.currentProfile = null;
            state.error = null;
        },
        fetchUserProfileByIdSuccess: (state, action) => {
            state.currentProfile = action.payload;
            state.error = null;
        },
        fetchUserProfileByIdFailure: (state, action) => {
            state.currentProfile = null;
            state.error = action.payload;
        },
        updateProfileInList: (state, action) => {
            const updatedProfile = action.payload;
            const index = state.profiles.findIndex(profile => profile.id === updatedProfile.id);
            
            if (index !== -1) {
                state.profiles[index] = updatedProfile;
            }
        }
    }
});

export const {
    fetchUserProfilesBegin,
    fetchUserProfilesSuccess,
    fetchUserProfilesFailure,
    fetchUserProfileByIdBegin,
    fetchUserProfileByIdSuccess,
    fetchUserProfileByIdFailure,
    updateProfileInList,
} = userProfiles.actions;

export default userProfiles.reducer;