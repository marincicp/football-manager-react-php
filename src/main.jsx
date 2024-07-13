import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 4000,
            style: { backgroundColor: "var(--color-green-100)" },
          },
          error: {
            duration: 5000,
            style: { backgroundColor: "var(--color-red-100)" },
          },

          style: {
            color: "var(--color-grey-900)",
          },
        }}
      />
    </AuthContextProvider>
  </React.StrictMode>
);
