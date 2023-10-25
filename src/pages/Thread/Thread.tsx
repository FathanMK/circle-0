import axiosFetch from "@/config/axiosFetch";
import CircleTweet from "@/features/CircleTweet/CircleTweet";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart, MessagesSquare, ImagePlus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function Thread() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: [`thread-cache-${id}`],
    queryFn: async () => {
      const { data } = await axiosFetch.get(`/thread/${id}`);

      console.log(data);
      return data.data;
    },
  });
  if (isLoading)
    return (
      <Flex h="100vh" align="center" justify="center">
        <Spinner />
      </Flex>
    );
  return (
    <>
      <Box as={Flex} align="center" gap={2} p={4}>
        <Button
          bg="transparent"
          color="white"
          onClick={() => navigate(-1)}
          _hover={{ color: "accent" }}
        >
          <ArrowLeft size={30} />
        </Button>
        <Text fontSize="2xl" fontWeight={600}>
          Status
        </Text>
      </Box>
      <Box as={Flex} direction="column" gap={4} px={8}>
        <Box as={Flex} gap={4}>
          <Avatar src={data.user.photo_profile} />
          <Box>
            <Text fontSize="lg">{data.user.full_name}</Text>
            <Text fontSize="sm">@{data.user.username}</Text>
          </Box>
        </Box>
        <Text>{data.content}</Text>
        <Box as={Flex} gap={1}>
          <Text fontSize="sm" fontWeight={600}>
            8:32 PM
          </Text>
          <Text fontSize="sm" fontWeight={600}>
            •
          </Text>
          <Text fontSize="sm" fontWeight={600}>
            Jul 26, 2023
          </Text>
        </Box>
        <Box as={Flex} gap={4}>
          <Button
            as={Flex}
            gap={2}
            px={0}
            cursor="pointer"
            bg="transparent"
            _hover={{ bg: "none", color: "red" }}
            color="whiteAlpha.600"
          >
            <Heart size={20} />
            <Text fontSize="sm">100</Text>
          </Button>
          <Button
            as={Flex}
            gap={2}
            px={0}
            cursor="pointer"
            bg="transparent"
            _hover={{ bg: "none", color: "cyan" }}
            color="whiteAlpha.600"
          >
            <MessagesSquare size={20} />
            <Text fontSize="sm">
              250 <Text as="span">Replies</Text>
            </Text>
          </Button>
        </Box>
      </Box>
      <Flex px={8} align="center">
        <Avatar />
        <Input
          border="none"
          placeholder="Type your reply!"
          _focusVisible={{ border: "none" }}
        />
        <Box as={Flex} align="center" gap={4}>
          <Box cursor="pointer" color="#04a51e" _hover={{ color: "purple" }}>
            <ImagePlus style={{ transition: "color 150ms ease-in-out" }} />
          </Box>
          <Button
            bg="accent"
            mx={2}
            color="white"
            borderRadius="full"
            _hover={{ bg: "purple" }}
          >
            Post
          </Button>
        </Box>
      </Flex>
      <Box overflowY="scroll">
        <Box>
          {data &&
            data.replies.map((item: any) => (
              <CircleTweet key={item.id} {...item} />
            ))}
        </Box>
      </Box>
    </>
  );
}
