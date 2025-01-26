import { createSlice } from '@reduxjs/toolkit';
import { register, loginer, logOut, refreshUser } from './operation.js';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || { name: null, email: null },
  token: localStorage.getItem('token') || null,
  isLogedIn: Boolean(localStorage.getItem('token')),
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogedIn = true;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginer.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogedIn = true;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLogedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log(state.user);

        state.isLogedIn = true;
        state.isRefreshing = false;
        if (action.payload.token) {
          console.log(action.payload);

          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

//export const { logOut } = authSlice.actions;
export default authSlice.reducer;
