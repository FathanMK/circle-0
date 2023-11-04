import { Text, Box, Image, Avatar, Flex, Button } from "@chakra-ui/react";
import Threads from "./_components/Threads/Threads";
import CreateThread from "./_components/CreateThread/CreateThread";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <Box overflowY="scroll">
      <Text color="accent" py={4} px={8} fontWeight={700} fontSize="4xl">
        profile
      </Text>
      <Box py={4} px={8} pos="relative">
        {user?.banner_profile ? (
          <Image
            borderRadius="lg"
            maxH="250px"
            w="full"
            src={user?.banner_profile}
          />
        ) : (
          <Box borderRadius="lg" h="250px" w="full" bg="teal" />
        )}
        <Avatar
          src={user?.photo_profile}
          size="lg"
          position="absolute"
          bottom={-45}
          left="50%"
          transform="translate(-50%, -50%)"
        />
      </Box>
      <Flex my={8} gap={1} direction="column" align="center" justify="center">
        <Text fontSize="2xl" fontWeight={600}>
          {user?.full_name}
        </Text>
        <Text fontSize="xl" color="whiteAlpha.600">
          {user?.email}
        </Text>
        <Text fontSize="xl" color="whiteAlpha.600">
          @{user?.username}
        </Text>
        <Text py={4} px={8} textAlign="justify">
          {user?.bio}
        </Text>
        <Button
          as={NavLink}
          to={`/editProfile/${user?.id}`}
          borderRadius="full"
          bg="transparent"
          border="1px solid white"
          color="white"
          mt={1}
          _hover={{ color: "teal", borderColor: "teal" }}
          _active={{ bg: "none" }}
        >
          Edit Profile
        </Button>
      </Flex>
      <Text color="accent" py={4} px={8} fontWeight={700} fontSize="4xl">
        your threads
      </Text>
      <Box my={6}>
        <CreateThread />
        <Threads />
      </Box>
    </Box>
  );
}
