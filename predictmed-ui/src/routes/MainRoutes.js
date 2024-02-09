import { lazy } from "react";

import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout";

import PrivateRoute from "../components/PrivateRoute";

const Home = Loadable(lazy(() => import("pages/home")));

const SamplePage = Loadable(lazy(() => import("pages/extra-pages/SamplePage")));

const Typography = Loadable(
  lazy(() => import("pages/components-overview/Typography"))
);
const Color = Loadable(lazy(() => import("pages/components-overview/Color")));
const Shadow = Loadable(lazy(() => import("pages/components-overview/Shadow")));
const AntIcons = Loadable(
  lazy(() => import("pages/components-overview/AntIcons"))
);
const EditProfile = Loadable(lazy(() => import("pages/user/EditProfile")));
const UserProfile = Loadable(lazy(() => import("pages/user/UserProfile")));
const CommentCore = Loadable(lazy(() => import("pages/comment/Core")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "color",
      element: <Color />,
    },
    {
      path: "home",
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },
    {
      path: "shadow",
      element: <Shadow />,
    },
    {
      path: "typography",
      element: <Typography />,
    },
    {
      path: "icons/ant",
      element: <AntIcons />,
    },
    {
      path: "edit",
      element: (
        <PrivateRoute>
          <EditProfile />
        </PrivateRoute>
      ),
    },
    {
      path: "profile",
      element: (
        <PrivateRoute>
          <UserProfile />
        </PrivateRoute>
      ),
    },
    {
      path: "feedback",
      element: (
          <CommentCore />
      ),
    },
  ],
};

export default MainRoutes;
