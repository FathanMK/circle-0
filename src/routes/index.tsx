import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "@/pages/Home/Home";
import Search from "@/pages/Search/Search";
import Thread from "@/pages/Thread/Thread";
import Register from "@/pages/Register/Register";
import Login from "@/pages/Login/Login";
import Profile from "@/pages/Profile/Profile";
import Follows from "@/pages/Follows/Follows";
import EditProfile from "@/pages/EditProfile/EditProfile";
import Layout from "@/layouts";
import { RootState } from "@/store";

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
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/editProfile/:userId" element={<EditProfile />} />
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
