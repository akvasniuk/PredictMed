import { lazy } from "react";

import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout";

import PrivateRoute from "../components/PrivateRoute";

const Home = Loadable(lazy(() => import("pages/home")));

const Chat = Loadable(lazy(() => import("pages/chat/Chat")));

const EditProfile = Loadable(lazy(() => import("pages/user/EditProfile")));
const UserProfile = Loadable(lazy(() => import("pages/user/UserProfile")));
const CommentCore = Loadable(lazy(() => import("pages/comment/Core")));
const PredictsPage = Loadable(lazy(() => import("pages/predictions/Predictions")));
const PredictStepsPage = Loadable(lazy(() => import("pages/prediction/PredictionSteps")));
const AnalyseBot = Loadable(lazy(() => import("pages/analyse-bot/AnalyseBot")));
const SamplePage = Loadable(lazy(() => import("pages/health-tracker/SamplePage")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
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
      path: "support",
      element: <PrivateRoute><Chat /></PrivateRoute>,
    },
    {
      path: "predict",
      element: <PredictsPage />,
    },
    {
      path: "predict/:predictionId",
      element: <PredictStepsPage />,
    },
    {
      path: "analyseBot",
      element: <AnalyseBot />,
    },
    {
      path: "healthTracker",
      element: <SamplePage />,
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
