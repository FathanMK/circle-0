import { Outlet } from "react-router-dom";

import Navbar from "@/layouts/Navbar/Navbar";
import Home from "@/layouts/Home/Home";
import Sidebar from "@/layouts/Sidebar/Sidebar";
import MainGrid from "./components/MainGrid";

export default function Main() {
  return (
    <MainGrid>
      <Navbar />
      <Home>
        <Outlet />
      </Home>
      <Sidebar />
    </MainGrid>
  );
}
