import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { AddPlantPage } from "./components/AddPlantPage";
import { NotFoundPage } from "./components/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "add", Component: AddPlantPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
