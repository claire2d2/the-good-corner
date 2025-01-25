import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home/index.tsx";
import OneAd from "./pages/OneAd/index.tsx";
import CreateAd from "./pages/CreateAd/index.tsx";
import EditAd from "./pages/EditAd/index.tsx";

import App from "./App.tsx";

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [{
      path: "/",
      element: <Home/>,
    },
  {
    path: "/ads/view/:id", element: <OneAd />
  },
{ 
  path: "/ads/create", element: <CreateAd/>
},
{
  path:"/ads/edit/:id", element: <EditAd/>
}]
  }
  // add a 404
])

createRoot(document.getElementById("root")!).render(
	<StrictMode>
    <RouterProvider router={router}/>
	</StrictMode>
);
