import { Box, Flex } from "@chakra-ui/react";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Following() {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <Box as={Flex} gap={4} direction="column">
      {user?.following.map((item: any) => (
        <Profile
          key={item.following.id}
          followingId={item.following.id}
          username={item.following.username}
          full_name={item.following.full_name}
          bio={item.following.bio}
          photo_profile={item.following.photo_profile}
          isFollowed
        />
      ))}
    </Box>
  );
}
