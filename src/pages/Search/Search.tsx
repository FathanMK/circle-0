import { Box, Input, InputGroup, Text } from "@chakra-ui/react";

export default function Search() {
  return (
    <>
      <Text
        as="h1"
        fontSize="4xl"
        py={4}
        px={8}
        color="accent"
        fontWeight={600}
      >
        search
      </Text>
      <Box overflowY="scroll" p={4}>
        <InputGroup>
        <Input placeholder="" />
          </InputGroup>
      </Box>
    </>
  );
}
