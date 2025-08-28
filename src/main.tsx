import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router}></RouterProvider>
        <Toaster richColors position="top-center" ></Toaster>
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
);
