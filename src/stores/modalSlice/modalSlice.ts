import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./common";

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, { payload }) => {
      state.modal_type = payload;
    },
    resetModal: (state) => {
      state.modal_type = initialState.modal_type;
    },
  },
});

export const { setModal, resetModal } = modalSlice.actions;

export default modalSlice.reducer;
