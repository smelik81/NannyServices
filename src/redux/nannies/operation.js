import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL =
  'https://nannies-app-default-rtdb.europe-west1.firebasedatabase.app';

/* const setAuthToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}; */

export const fetchNannies = createAsyncThunk(
  '/nannies/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/.json');
      return response.data;
    } catch (error) {
      console.error('Error in fetchNannies:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
