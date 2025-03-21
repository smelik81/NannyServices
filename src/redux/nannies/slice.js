import { createSlice } from '@reduxjs/toolkit';
import { fetchNannies } from './operation.js';

const initialState = {
  items: [],
  //loading: false,
  error: null,
  status: 'idle',
};

const handlePending = state => {
  state.status = 'loading';
  //state.loading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  //state.loading = false;
  state.status = 'failed';
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
        const nannyEntries = Object.entries(action.payload)
          .filter(([key]) => !isNaN(Number(key)))
          .map(([id, nanny]) => ({ id, ...nanny }));

        state.items = nannyEntries;
        state.status = 'succeeded';
        //state.loading = false;
        state.error = null;
      })
      .addCase(fetchNannies.rejected, handleRejected);
  },
});

export default nanniesSlice.reducer;
