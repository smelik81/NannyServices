import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

axios.defaults.baseURL =
  'https://nannies-app-default-rtdb.europe-west1.firebasedatabase.app';

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
      await axios.post('/users.json', userData);
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

      await axios.post('/users.json', userData);
      return {
        user: userData,
        token,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
