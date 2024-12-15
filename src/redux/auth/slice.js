import { createSlice } from '@reduxjs/toolkit';

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
    createUser(state, action) {
      state.user = action.payload;
      state.isLogedIn = true;
    },
    logOut(state) {
      state.user = { name: null, email: null };
      state.isLogedIn = false;
    },
  },
});

export const { createUser, logOut } = authSlice.actions;
export default authSlice.reducer;
