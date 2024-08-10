import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice/navbarSlice";
import userReducer from "./userSlice/userSlice";
import modalReducer from "./modalSlice/modalSlice";

export default configureStore({
  reducer: {
    navbar: navbarReducer,
    user: userReducer,
    modal: modalReducer,
  },
});
