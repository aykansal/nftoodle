import "./styles/global.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import MainPlatformPage from "./pages/platforms/[platform]/page";
import RootLayout from "./components/layouts/RootLayout";
import Matchmeme from "./pages/gamezone/matchmeme/page";
import ErrorPage from "./components/ErrorPage";
import SecondaryLayout from "./components/layouts/SecondaryLayout";
import GameNFTMinter from "./components/game-nft/GameNFTMinter";
import { LandingPage, PlatformsPage, MyMemesPage, CreatePage, Gamezone, GalleryPage, GameLayout, CardGame, CreateNftPage } from "./pages";

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
            path: "minter",
            element: <GameNFTMinter />,
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
