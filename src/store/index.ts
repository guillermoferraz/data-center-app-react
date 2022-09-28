import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth/auth";
import modulesSlice from "./modules/modules";
import userSlice from "./user/user";
import speechSlice from "./speech/speech";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    modules: modulesSlice.reducer,
    speech: speechSlice.reducer
  }
})
export default store;