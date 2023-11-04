import { Box, Flex, Avatar, Text, Button } from "@chakra-ui/react";
import useToast from "@/hooks/useToast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosFetch from "@/config/axiosFetch";
import { RootState } from "@/store";

interface IProfileProps {
  followingId: string;
  photo_profile: string;
  full_name: string;
  username: string;
  bio: string;
  isFollowed?: boolean;
  isUser?: boolean;
}

export default function Profile({
  full_name,
  username,
  bio,
  photo_profile,
  isFollowed,
  followingId,
  isUser,
}: IProfileProps) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { accessToken } = useSelector((state: RootState) => state.user);
  const mutation = useMutation({
    mutationFn: (newFollowing: any) =>
      axiosFetch.post("/following", newFollowing, {
        headers: {
          "x-access-token": accessToken,
        },
      }),
    onSuccess: () => {
      toast("Success", "User is successfully followed", "success");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (newFollowing: any) =>
      axiosFetch.post("/deleteFollow", newFollowing, {
        headers: {
          "x-access-token": accessToken,
        },
      }),
    onSuccess: () => {
      toast("Success", "User is successfully unfollowed", "success");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });

  const handleFollow = (followingId: string) => {
    if (isFollowed) {
      deleteMutation.mutate({ followingId });
      return;
    }
    mutation.mutate({
      followingId,
    });
  };
  return (
    <Box as={Flex} align="center" gap={4}>
      <Avatar src={photo_profile} alignSelf="flex-start" />
      <Box>
        <Text>{full_name}</Text>
        <Text color="whiteAlpha.600">@{username}</Text>
        <Text noOfLines={1}>{bio}</Text>
      </Box>
      <Box ml="auto">
        {isUser ? (
          <Button
            size="sm"
            ml="auto"
            mr={3}
            variant="outline"
            color="white"
            borderRadius="full"
            _hover={{
              color: "teal",
              borderColor: "teal",
            }}
            _active={{ bg: "none" }}
            onClick={() => handleFollow(followingId)}
          >
            Profile
          </Button>
        ) : (
          <Button
            size="sm"
            ml="auto"
            mr={3}
            variant="outline"
            color="white"
            borderRadius="full"
            _hover={{
              color: isFollowed ? "red" : "green",
              borderColor: isFollowed ? "red" : "green",
            }}
            _active={{ bg: "none" }}
            onClick={() => handleFollow(followingId)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        )}
      </Box>
    </Box>
  );
}
