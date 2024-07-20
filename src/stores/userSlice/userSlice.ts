import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./common";
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.username = payload?.username;
      state.uid = payload?.uid;
    },
    resetUser: (state) => {
      state.username = initialState.username;
      state.username = initialState.uid;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
