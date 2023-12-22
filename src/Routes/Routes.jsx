import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../Components/About";
import Login from "../Components/Login";
import Profile from "../Components/Profile";
import Registration from "../Components/Registration";
import Tasks from "../Components/Tasks";
import Dashboard from "../Pages/Dashboard/Dashboard";
import LandingPage from "../Pages/LandingPage/LandingPage";
import PrivateRoute from "./PrivateRoute";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "profile",
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          },
          {
            path: "tasks",
            element: (
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);
