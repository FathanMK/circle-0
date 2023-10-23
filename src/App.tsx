import { Grid } from "@chakra-ui/react";
import Navbar from "@/components/Navbar/Navbar";
import Home from "@/components/Home/Home";

import Sidebar from "@/layouts/Sidebar/Sidebar";

export default function App() {
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
      <Home />
      <Sidebar />
    </Grid>
  );
}
