import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Components/AuthProvider.jsx";
import { routes } from "./Routes/Routes.jsx";
import "./index.css";

const tanstack = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={tanstack}>
      <DndProvider backend={HTML5Backend}>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </DndProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
