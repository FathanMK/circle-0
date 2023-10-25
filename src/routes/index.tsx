import { createBrowserRouter } from "react-router-dom";

import Main from "@/layouts/Main";
import Home from "@/pages/Home/Home";
import Search from "@/pages/Search/Search";
import Thread from "@/pages/Thread/Thread";
import Register from "@/pages/Register/Register";

const router = createBrowserRouter([
  {
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/thread/:id",
        element: <Thread />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
