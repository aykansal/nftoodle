import "./styles/global.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import MainPlatformPage from "./pages/platforms/[platform]/page";
import RootLayout from "./components/layouts/RootLayout";
import Matchmeme from "./pages/gamezone/matchmeme/page";
import ErrorPage from "./components/layouts/ErrorPage";
import PlatformsPage from "./pages/platforms/page";
import MyMemesPage from "./pages/my-memes/page";
import CreatePage from "./pages/create/page";
import Gamezone from "./pages/gamezone/page";
import LandingPage from "./pages/LandingPage";
import GalleryPage from "./pages/gallery/page";
import GameLayout from "./pages/gamezone/layout";
import CardGame from "./pages/gamezone/cardgame/page";
import CreateNftPage from "./pages/create/[nftId]/page";
import SecondaryLayout from "./components/layouts/SecondaryLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        element: <SecondaryLayout />,
        children: [
          {
            path: "platforms",
            element: <PlatformsPage />,
          },
          {
            path: "platforms/:platform",
            element: <MainPlatformPage />,
          },
          {
            path: "my-memes",
            element: <MyMemesPage />,
          },
          {
            path: "gallery",
            element: <GalleryPage />,
          },
          {
            path: "create",
            element: <CreatePage />,
          },
          {
            path: "create/:nftId",
            element: <CreateNftPage />,
          },
          {
            path: "gamezone",
            element: <GameLayout />,
            children: [
              {
                index: true,
                element: <Gamezone />,
              },
              {
                path: "cardgame",
                element: <CardGame />,
              },
              {
                path: "matchmeme",
                element: <Matchmeme />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
