import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#363636",
              color: "white",
            },
          },
          error: {
            style: {
              background: "#363636",
              color: "white",
            },
          },
        }}
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
