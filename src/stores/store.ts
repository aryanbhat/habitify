import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice/navbarSlice";
import userReducer from "./userSlice/userSlice";
import modalReducer from "./modalSlice/modalSlice";
import habitReducer from "./habitSlice/habitSlice";

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    user: userReducer,
    modal: modalReducer,
    habits: habitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
