import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import routes from './Components/Routes.jsx'
import { RouterProvider } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
