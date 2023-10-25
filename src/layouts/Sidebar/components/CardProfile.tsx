import { Card, Flex, Text, Box, Image, Avatar, Button } from "@chakra-ui/react";

export default function CardProfile() {
  return (
    <Card
      basis="45%"
      as={Flex}
      direction="column"
      gap={4}
      p={4}
      bg="lighterNewBg"
      color="white"
    >
      <Text fontWeight={600}>My Profile</Text>
      <Box pos="relative">
        <Image
          borderRadius="lg"
          src="https://source.unsplash.com/random"
          h="100px"
          w="full"
          objectFit="cover"
        />
        <Avatar size="lg" pos="absolute" ml={2} bottom="-28px" />
      </Box>
      <Button
        ml="auto"
        borderRadius="full"
        bg="transparent"
        border="1px solid white"
        color="white"
        mt={2}
      >
        Edit Profile
      </Button>
      <Flex direction="column" gap={0.5} mt={-4}>
        <Text fontSize="xl" fontWeight={700}>
          ✨ Stella Audhina ✨
        </Text>
        <Text color="whiteAlpha.600">@audhinafh</Text>
        <Text>picked by the worms, and weird fishes</Text>
        <Flex align="center" gap={4}>
          <Text fontWeight={600}>
            291{" "}
            <Text as="span" color="whiteAlpha.600">
              Following
            </Text>
          </Text>
          <Text fontWeight={600}>
            23{" "}
            <Text as="span" color="whiteAlpha.600">
              Followers
            </Text>
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
