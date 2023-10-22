import { createSlice } from '@reduxjs/toolkit';

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
        }
    }
});

export const {
    fetchUserProfilesBegin,
    fetchUserProfilesSuccess,
    fetchUserProfilesFailure,
    fetchUserProfileByIdBegin,
    fetchUserProfileByIdSuccess,
    fetchUserProfileByIdFailure
} = userProfiles.actions;

// export const fetchUserProfiles = () => {
//     return (dispatch) => {
//         dispatch(fetchUserProfilesBegin());

//         fetch('/api/users')
//             .then(response => response.json())
//             .then(data => {
//                 dispatch(fetchUserProfilesSuccess(data));
//             })
//             .catch(error => {
//                 dispatch(fetchUserProfilesFailure(error.message));
//             });
//     }
// }

// export const fetchUserProfileById = (id) => {
//     return (dispatch) => {
//         dispatch(fetchUserProfileByIdBegin());

//         fetch(`/api/users/${id}`)
//             .then(response => response.json())
//             .then(data => {
//                 dispatch(fetchUserProfileByIdSuccess(data));
//             })
//             .catch(error => {
//                 dispatch(fetchUserProfileByIdFailure(error.message));
//             });
//     }
// }

export default userProfiles.reducer;