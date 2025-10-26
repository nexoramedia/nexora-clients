import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import RootLayout from "./page/layout/RootLayout";
import LoadingSpinner from "./page/Shared/LoadingSpinner";
import DashboardLayout from "./page/layout/DashboardLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import ReviewWithVideo from "./components/Dashboard/ReviewWithVideo";
import ReviewsWithoutVideo from "./components/Dashboard/ReviewsWithoutVideo";
import Faqs from "./components/Dashboard/Faqs";
import Settings from "./components/Dashboard/Settings";
import Video from "./components/Dashboard/Video";
import NotFoundPage from "./page/NotFoundPage";
import PrivateRoute from "./hook/PrivateRoutes";

let Home = lazy(() => import("./page/home/Home"));
let Login = lazy(() => import("./page/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "reviews-with-video",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <ReviewWithVideo />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "reviews-without-video",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <ReviewsWithoutVideo />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "faqs",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <Faqs />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "video",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <Video />
            </PrivateRoute>
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
