// MARKER-MAKE-KIT-INVOKED
// MARKER-MAKE-KIT-DISCOVERY-READ
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { PlantProvider } from "./components/PlantContext";

export default function App() {
  return (
    <PlantProvider>
      <RouterProvider router={router} />
    </PlantProvider>
  );
}
