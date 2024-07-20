import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./common";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setNavbarState: (state, { payload }) => {
      if (state.activeIdx === payload) return;
      state.activeIdx = payload;
    },
    resetNavbarState: (state) => {
      state.activeIdx = initialState.activeIdx;
    },
  },
});

export const { setNavbarState, resetNavbarState } = navbarSlice.actions;

export default navbarSlice.reducer;
