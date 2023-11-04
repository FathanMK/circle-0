import { Box, Text } from "@chakra-ui/react";

import CreateThread from "./_components/CreateThread/CreateThread";
import Threads from "./_components/Threads/Threads";

export default function Home() {
  return (
    <Box overflowY="scroll" p={4}>
      <Text as="h1" fontSize="4xl" px={4} color="accent" fontWeight={700}>
        timeline
      </Text>
      <CreateThread />
      <Threads />
    </Box>
  );
}
