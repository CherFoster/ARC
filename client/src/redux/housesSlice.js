import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHouses = createAsyncThunk('houses/fetchHouses', async () => {
    const response = await fetch('/api/houses');
    const data = await response.json();
    return data;
});

const housesSlice = createSlice({
    name: 'houses',
    initialState: [],
    reducers: {},
    extraReducers: {
        [fetchHouses.fulfilled]: (state, action) => {
            return action.payload;
        }
    }
});

export default housesSlice.reducer;