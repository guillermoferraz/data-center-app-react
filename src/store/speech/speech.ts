import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import User from "../../services/user/user";

export const getUser = createAsyncThunk('/user', async () => {
  try {
    const response = await User.getUser()
    return response;
  } catch (err: any) {
    console.error(err)
    return err?.response?.data
  }
});

const speechSlice = createSlice({
  name: 'speech',
  initialState: {
    speechEnable: true
  },
  reducers: {
   setEnableSpeech:(state, { payload }) => {
    state.speechEnable = payload.value
   }
  },
  extraReducers: builder => {}
});
export default speechSlice;