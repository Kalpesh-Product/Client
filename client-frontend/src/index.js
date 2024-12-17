import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TimerProvider } from "./contexts/TimerContext";
import axios from "axios";
import AuthContextProvider from "./contexts/AuthContext";

// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "https://client-be.vercel.app";

export const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <TimerProvider>
          <App />
        </TimerProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
