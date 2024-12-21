import { createSlice } from '@reduxjs/toolkit';
import { register, loginer } from './operation.js';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLogedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLogedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogedIn = true;
      })
      .addCase(loginer.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogedIn = true;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
