import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import { authLoader } from "./auth-loader";
import { publicLoader } from "./public-loader";

/// Handle error element for all routes
const withErrorElement = (route: RouteObject) => ({
  ...route,
  errorElement: <div>Something went wrong</div>,
});

export const router = createBrowserRouter([
  withErrorElement({
    path: "/",
    element: <Home />,
    loader: authLoader,
  }),
  withErrorElement({
    path: "/login",
    element: <Login />,
    loader: publicLoader,
  }),
]);
