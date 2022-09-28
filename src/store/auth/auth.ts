import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Auth from "../../services/auth/auth";
import { FormValuesTypes, LoginType } from "../../services/auth/auth.types";
import { loginInitialState, registerInitialState } from "./states";

export const register = createAsyncThunk('/regsiter', async (formValues: FormValuesTypes) => {
  try {
    const response = await Auth.register(formValues)
    return response;
  } catch (err: any) {
    console.error(err)
    return err?.response?.data
  }
});

export const login = createAsyncThunk('/login', async (formValues: LoginType) => {
  try {
    const response = await Auth.login(formValues);
    return response;
  } catch (err: any) {
    console.error(err)
    return err?.response?.data
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    registerResponse: { ...registerInitialState },
    loading: false,
    loginResponse: { ...loginInitialState }
  },
  reducers: {
    setCleanRegisterResponse: (state, { payload }) => {
      state.registerResponse = payload.value
    },
    setCleanLoginResponse:(state, { payload }) => {
      state.loginResponse = payload.value
    }
  },
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, { payload }: any) => {
      state.registerResponse = payload;
      state.loading = false;
    })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.loginResponse = payload
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
  }
});
export default authSlice