import { Box, Input, Flex, Text, Spinner } from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";
import { User2 } from "lucide-react";
import axiosFetch from "@/config/axiosFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Profile from "./_component/Profile";

export default function Search() {
  const { user, accessToken } = useSelector((state: RootState) => state.user);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    setData([]);
    const timeoutId = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue]);

  useEffect(() => {
    async function getData() {
      const { data } = await axiosFetch.get(
        `/searchUser?keyword=${debouncedValue}`,
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      setLoading(false);
      setData(data.users);
    }

    getData();
  }, [debouncedValue]);

  return (
    <>
      <Text
        as="h1"
        fontSize="4xl"
        py={4}
        px={8}
        color="accent"
        fontWeight={700}
      >
        search
      </Text>
      <Box p={4}>
        <Box
          as={Flex}
          alignItems="center"
          bg="#373737"
          px={4}
          borderRadius="full"
        >
          <User2 color="gray" />
          <Input
            size="lg"
            placeholder="Search User"
            bg="#373737"
            border="none"
            borderRadius="full"
            onChange={handleSearchInput}
            _placeholder={{ color: "white" }}
            _focusVisible={{ border: "none" }}
          />
        </Box>
      </Box>
      <Box overflowY="scroll" p={4}>
        <Box as={Flex} direction="column" gap={4}>
          {isLoading && (
            <Flex h="50vh" align="center" justify="center">
              <Spinner />
            </Flex>
          )}
          {data.map((item: any) => {
            const isFollowed = user?.following?.some(
              (following: any) => following.following.id === item.id
            );
            const isUser = user?.id === item.id;
            return (
              <Profile
                key={item.id}
                followingId={item.id}
                username={item.username}
                full_name={item.full_name}
                bio={item.bio}
                photo_profile={item.photo_profile}
                isFollowed={isFollowed}
                isUser={isUser}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
}
