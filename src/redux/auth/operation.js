import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

axios.defaults.baseURL =
  'https://nannies-app-default-rtdb.europe-west1.firebasedatabase.app';

const setAuthToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthToken = () => {
  delete axios.defaults.headers.common.Authorization;
  localStorage.removeItem('token');
};

export const register = createAsyncThunk(
  '/auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      const userData = {
        name,
        email: userCredential.user.email,
      };
      await axios.post(`/users.json?auth=${token}`, userData);
      setAuthToken(token);
      return {
        user: userData,
        token,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginer = createAsyncThunk(
  '/auth/loginer',
  async ({ email, password }, thunkAPI) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      const userData = { email: userCredential.user.email };

      await axios.post(`/users.json?auth=${token}`, userData);
      setAuthToken(token);
      return {
        user: userData,
        token,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    const auth = getAuth();
    await signOut(auth);
    setAuthToken('');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  '/auth/refresh',
  async (_, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    setAuthToken(auth.token);

    try {
      const response = await axios.get('/auth/current');
      if (response.data.token) {
        setAuthToken(response.data.token);
        thunkAPI.dispatch(updateToken(response.data.token));
      }

      return response.data;
    } catch (error) {
      clearAuthToken();
      const message =
        error.response?.data?.message || 'Failed to refresh user session';
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const { auth } = thunkAPI.getState();
      return auth.token !== null;
    },
  }
);
