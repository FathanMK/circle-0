import { Card, Flex, Text, Box, Avatar, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosFetch from "@/config/axiosFetch";
import useFetch from "@/hooks/useFetch";
import { RootState } from "@/store";
import useToast from "@/hooks/useToast";

function SuggestedProfile({
  followingId,
  fullName,
  username,
  photoProfile,
  isFollowed,
}: {
  isFollowed: boolean;
  photoProfile: string;
  fullName: string;
  username: string;
  followingId: string;
}) {
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
        _hover={{
          color: isFollowed ? "red" : "green",
          borderColor: isFollowed ? "red" : "green",
        }}
        _active={{ bg: "none" }}
        onClick={() => handleFollow(followingId)}
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </Button>
    </Box>
  );
}

export default function CardSuggested() {
  const { data } = useFetch({
    queryKey: "suggested-user",
    fetchRoutes: "/suggestedUser",
  });
  const { user } = useSelector((state: RootState) => state.user);
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
            {data?.users?.map((item: any) => {
              const isFollowed = user?.following?.some(
                (following: any) => following.following.id === item.id
              );
              return (
                <SuggestedProfile
                  key={item.id}
                  followingId={item.id}
                  photoProfile={item.photo_profile}
                  fullName={item.full_name}
                  username={item.username}
                  isFollowed={isFollowed as boolean}
                />
              );
            })}
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
}
