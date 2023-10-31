import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/store";
import axiosFetch from "@/config/axiosFetch";
import { getUser, logout } from "@/slices/user/userSlice";
import CreateThread from "./_components/CreateThread/CreateThread";
import Threads from "./_components/Threads/Threads";

export default function Home() {
  const { accessToken } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // GET USER TO REDUX
  const { isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosFetch.get("/user", {
        headers: {
          "x-access-token": accessToken,
        },
      });
      dispatch(getUser(data.user));
      return data;
    },
  });

  if (isError) dispatch(logout());

  return (
    <Box overflowY="scroll" p={4}>
      <Text as="h1" fontSize="4xl" px={4} color="accent" fontWeight={600}>
        timeline
      </Text>
      <CreateThread />
      <Threads />
    </Box>
  );
}
