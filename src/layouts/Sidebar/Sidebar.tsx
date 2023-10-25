import { Grid, Flex } from "@chakra-ui/react";

import CardProfile from "./components/CardProfile";
import CardSuggested from "./components/CardSuggested";
import CardFooter from "./components/CardFooter";

export default function Sidebar() {
  return (
    <Grid gridArea="1/5/6/7" py={4} px={6}>
      <Flex direction="column" grow={0} overflow="hidden" gap={4}>
        <CardProfile />
        <CardSuggested />
        <CardFooter />
      </Flex>
    </Grid>
  );
}
