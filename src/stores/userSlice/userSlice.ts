import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./common";
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.username = payload?.username;
      state.uid = payload?.uid;
      state.email = payload?.email;
      state.profile = payload?.profile;
    },
    resetUser: (state) => {
      state.username = initialState.username;
      state.username = initialState.uid;
      state.email = initialState.email;
      state.profile = initialState.profile;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
