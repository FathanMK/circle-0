import { Grid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Navbar from "@/layouts/Navbar/Navbar";
import Timeline from "@/layouts/Timeline/Timeline";
import Sidebar from "@/layouts/Sidebar/Sidebar";

export default function Layout() {
  return (
    <Grid
      h="100vh"
      maxH="100vh"
      bg="newBg"
      color="white"
      templateColumns="repeat(6, 1fr)"
      templateRows="repeat(5, 1fr)"
      columnGap={0}
      rowGap={0}
      overflow="hidden"
    >
      <Navbar />
      <Timeline>
        <Outlet />
      </Timeline>
      <Sidebar />
    </Grid>
  );
}
