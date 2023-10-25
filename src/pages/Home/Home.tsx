import { Box, Text, Flex, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import axiosFetch from "@/config/axiosFetch";
import CircleTweet from "@/features/CircleTweet/CircleTweet";
import CreateThread from "@/features/CreateThread/CreateThread";

export default function Home() {
  // REACT QUERY FETCHING THREADS
  const { data, isLoading } = useQuery({
    queryKey: ["threads-cache"],
    queryFn: async () => {
      const { data } = await axiosFetch.get("/threads?limit=25");
      return data.threads;
    },
  });

  return (
    <>
      <Text px={4} mt={3} fontSize="2xl" fontWeight={600}>
        Home
      </Text>
      <CreateThread />
      <Box overflowY="scroll">
        {isLoading && (
          <Flex align="center" justify="center">
            <Spinner />
          </Flex>
        )}
        <Box>
          {data &&
            data.map((item: Thread) => (
              <CircleTweet
                key={item.id}
                id={item.id}
                content={item.content}
                photo_profile={item.user?.photo_profile}
                full_name={item.user?.full_name}
                username={item.user?.username}
                to={`/thread/${item.id}`}
              />
            ))}
        </Box>
      </Box>
    </>
  );
}
