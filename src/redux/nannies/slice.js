import { createSlice } from '@reduxjs/toolkit';
import { fetchNannies } from './operation.js';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const nanniesSlice = createSlice({
  name: 'nannies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNannies.pending, handlePending)
      .addCase(fetchNannies.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchNannies.rejected, handleRejected);
  },
});

export default nanniesSlice.reducer;
