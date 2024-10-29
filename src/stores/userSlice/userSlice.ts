import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./common";

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      if (payload) {
        state.user = {
          ...state.user,
          ...payload,
        };
      }
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
