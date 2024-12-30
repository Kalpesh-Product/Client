import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TimerProvider } from "./contexts/TimerContext";
import axios from "axios";
import AuthContextProvider from "./contexts/AuthContext";
import { SidebarProvider } from "./contexts/SideBarContext";

// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "https://client-be.vercel.app";

export const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <TimerProvider>
            <App />
          </TimerProvider>
        </SidebarProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
