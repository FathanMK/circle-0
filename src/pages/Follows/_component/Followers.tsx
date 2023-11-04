import { Box, Flex } from "@chakra-ui/react";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Followers() {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <Box as={Flex} gap={4} direction="column">
      {user?.followers.map((item: any) => {
        const isFollowed = user?.following?.some(
          (following: any) => following.following.id === item.followers.id
        );
        return (
          <Profile
            key={item.followers.id}
            followingId={item.followers.id}
            username={item.followers.username}
            full_name={item.followers.full_name}
            bio={item.followers.bio}
            photo_profile={item.followers.photo_profile}
            isFollowed={isFollowed}
          />
        );
      })}
    </Box>
  );
}
