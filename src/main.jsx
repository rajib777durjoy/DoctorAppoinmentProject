import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css'
import { RouterProvider } from "react-router-dom";
import Router from "./Router/Router";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Router} />
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
