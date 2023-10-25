import { Card, Flex, Text, Box, Avatar, Button } from "@chakra-ui/react";

export default function CardSuggested() {
  return (
    <Card
      as={Flex}
      basis="45%"
      direction="column"
      grow={0}
      gap={4}
      p={4}
      overflow="hidden"
      bg="lighterNewBg"
      color="white"
    >
      <Text fontWeight={600}>Suggested For You</Text>
      <Box overflowY="scroll">
        <Flex direction="column" gap={4}>
          <Box as={Flex} gap={4} w="full">
            <Avatar />
            <Box>
              <Text>Mohammed Jawahir</Text>
              <Text fontSize="sm" color="whiteAlpha.600">
                @em.jawahir
              </Text>
            </Box>
            <Button
              isDisabled
              ml="auto"
              variant="outline"
              color="white"
              borderRadius="full"
            >
              Following
            </Button>
          </Box>
        </Flex>
      </Box>
    </Card>
  );
}
