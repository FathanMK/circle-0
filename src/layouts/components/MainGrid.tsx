import { Grid } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function MainGrid({ children }: { children: ReactNode }) {
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
      {children}
    </Grid>
  );
}
