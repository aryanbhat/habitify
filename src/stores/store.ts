import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice/navbarSlice";
import userReducer from "./userSlice/userSlice";

export default configureStore({
  reducer: {
    navbar: navbarReducer,
    user: userReducer,
  },
});
