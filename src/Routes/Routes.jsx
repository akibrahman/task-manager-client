import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Profile from "../Components/Profile";
import Tasks from "../Components/Tasks";
import Dashboard from "../Pages/Dashboard/Dashboard";
import LandingPage from "../Pages/LandingPage/LandingPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "tasks",
            element: <Tasks />,
          },
        ],
      },
    ],
  },
]);
