import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice/navbarSlice";

export default configureStore({
  reducer: {
    navbar: navbarReducer,
  },
});
