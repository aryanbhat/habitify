import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice/navbarSlice";
import userReducer from "./userSlice/userSlice";
import modalReducer from "./modalSlice/modalSlice";

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    user: userReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
