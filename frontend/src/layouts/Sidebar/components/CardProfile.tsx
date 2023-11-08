import { Card, Flex, Text, Box, Image, Avatar, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { NavLink } from "react-router-dom";

export default function CardProfile() {
  const { user } = useSelector((state: RootState) => state.user);
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
      <Box pos="relative">
        {user?.banner_profile ? (
          <Image
            borderRadius="lg"
            src={user?.banner_profile}
            h="100px"
            w="full"
            objectFit="cover"
          />
        ) : (
          <Box
            borderRadius="lg"
            bg="teal"
            h="100px"
            w="full"
            objectFit="cover"
          />
        )}
        <Avatar
          size="lg"
          pos="absolute"
          src={user?.photo_profile}
          ml={2}
          bottom="-28px"
        />
      </Box>
      <Button
        as={NavLink}
        to={`/editProfile/${user?.id}`}
        ml="auto"
        borderRadius="full"
        bg="transparent"
        border="1px solid white"
        color="white"
        mt={2}
        _hover={{ color: "teal", borderColor: "teal" }}
        _active={{ bg: "none" }}
      >
        Edit Profile
      </Button>
      <Flex direction="column" gap={0.5} mt={-4}>
        <Text fontSize="xl" fontWeight={700}>
          {user?.full_name}
        </Text>
        <Text color="whiteAlpha.600">@{user?.username}</Text>
        <Text>{user?.bio}</Text>
        <Flex align="center" gap={4}>
          <Text fontWeight={600}>
            {user?.following?.length}{" "}
            <Text as="span" color="whiteAlpha.600">
              Following
            </Text>
          </Text>
          <Text fontWeight={600}>
            {user?.followers?.length}{" "}
            <Text as="span" color="whiteAlpha.600">
              Followers
            </Text>
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
