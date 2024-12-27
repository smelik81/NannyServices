import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL =
  'https://nannies-app-default-rtdb.europe-west1.firebasedatabase.app';

export const fetchNannies = createAsyncThunk(
  '/nannies/fetchAll',
  async (_, thankAPI) => {
    try {
      const response = await axios.get('/nannies');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
