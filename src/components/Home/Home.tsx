import { Grid, Text, Flex, Avatar, Input, Box, Button } from "@chakra-ui/react";
import { ImagePlus } from "lucide-react";
import CircleTweet from "../CircleTweet/CircleTweet";

export default function Home() {
  return (
    <Grid gridArea="1/2/6/5" borderRight="1px solid hsl(0 100% 100% / 15%)">
      <Flex direction="column" grow={0} overflow="hidden" gap={4}>
        <Text px={4} mt={3} fontSize="2xl" fontWeight={600}>
          Home
        </Text>
        <Flex px={8} my={4} align="center">
          <Avatar />
          <Input
            border="none"
            placeholder="What is happening!?"
            _focusVisible={{ border: "none" }}
          />
          <Box as={Flex} align="center" gap={4}>
            <ImagePlus color="#04a51e" />
            <Button
              isDisabled
              bg="accent"
              mx={2}
              color="white"
              borderRadius="full"
              _hover={{ bg: "purple" }}
            >
              Post
            </Button>
          </Box>
        </Flex>
        <Box overflowY="scroll">
          <Box>
            <CircleTweet />
            <CircleTweet />
            <CircleTweet />
            <CircleTweet />
            <CircleTweet />
            <CircleTweet />
            <CircleTweet />
            <CircleTweet />
            <CircleTweet />
            <CircleTweet />
            <CircleTweet />
            <CircleTweet />
            <CircleTweet />
            <CircleTweet />
            <CircleTweet />
          </Box>
        </Box>
      </Flex>
    </Grid>
  );
}
