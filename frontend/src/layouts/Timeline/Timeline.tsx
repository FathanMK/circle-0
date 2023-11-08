import { Grid, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Timeline({ children }: { children: ReactNode }) {
  return (
    <Grid gridArea="1/2/6/5" borderRight="1px solid hsl(0 100% 100% / 15%)">
      <Flex direction="column" grow={0} overflow="hidden" gap={4}>
        {children}
      </Flex>
    </Grid>
  );
}
