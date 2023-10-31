import useFetch from "@/hooks/useFetch";
import { Card, Flex, Text, Box, Avatar, Button } from "@chakra-ui/react";

function SuggestedProfile({
  fullName,
  username,
  photoProfile,
}: {
  photoProfile: string;
  fullName: string;
  username: string;
}) {
  return (
    <Box as={Flex} gap={4} align="flex-start" w="full">
      <Avatar size="sm" src={photoProfile} />
      <Box>
        <Text>{fullName}</Text>
        <Text fontSize="sm" color="whiteAlpha.600">
          @{username}
        </Text>
      </Box>
      <Button
        size="sm"
        ml="auto"
        mr={3}
        variant="outline"
        color="white"
        borderRadius="full"
      >
        Follow
      </Button>
    </Box>
  );
}

export default function CardSuggested() {
  const { data } = useFetch({
    queryKey: "suggested-user",
    fetchRoutes: "/suggestedUser",
  });
  const users = data?.users;
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
        <Flex direction="column" grow={0} shrink={0} gap={4}>
          <Flex direction="column" gap={4}>
            {users?.map((item: any) => (
              <SuggestedProfile
                key={item.id}
                photoProfile={item.photo_profile}
                fullName={item.full_name}
                username={item.username}
              />
            ))}
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
}
