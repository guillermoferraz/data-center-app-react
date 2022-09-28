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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: { Id: undefined, Firstname: undefined, Lastname: undefined, Email: undefined, message: undefined, status: undefined },
    loading: false,
  },
  reducers: {
    setCleanUserData:(state, { payload }) => {
      state.userData = payload.value
    }
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, { payload }: any) => {
      state.userData = payload;
      state.loading = false;
    })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
  }
});
export default userSlice;