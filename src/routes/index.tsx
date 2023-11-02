import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";

import Home from "@/pages/Home/Home";
import Search from "@/pages/Search/Search";
import Thread from "@/pages/Thread/Thread";
import Register from "@/pages/Register/Register";
import Login from "@/pages/Login/Login";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Layout from "@/layouts";
import Follows from "@/pages/Follows/Follows";

export default function Routes() {
  const { accessToken } = useSelector((state: RootState) => state.user);
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route element={accessToken ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/thread/:threadId" element={<Thread />} />
          <Route path="/follows/:userId" element={<Follows />} />
        </Route>
        <Route
          path="/login"
          element={accessToken ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={accessToken ? <Navigate to="/" /> : <Register />}
        />
      </RouterRoutes>
    </BrowserRouter>
  );
}
