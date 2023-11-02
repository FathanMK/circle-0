import { Box, Flex, Avatar, Text, Button } from "@chakra-ui/react";

interface IProfileProps {
  photo_profile: string;
  full_name: string;
  username: string;
  bio: string;
  isFollowed?: boolean;
}

export default function Profile({
  full_name,
  username,
  bio,
  photo_profile,
}: IProfileProps) {
  return (
    <Box as={Flex} align="center" gap={4}>
      <Avatar src={photo_profile} alignSelf="flex-start" />
      <Box>
        <Text>{full_name}</Text>
        <Text color="whiteAlpha.600">@{username}</Text>
        <Text noOfLines={1}>{bio}</Text>
      </Box>
      <Box ml="auto">
        <Button
          size="sm"
          ml="auto"
          mr={3}
          variant="outline"
          color="white"
          borderRadius="full"
          _active={{ bg: "none" }}
          _hover={{
            color: "green",
            borderColor: "green",
          }}
        >
          Follow
        </Button>
      </Box>
    </Box>
  );
}
