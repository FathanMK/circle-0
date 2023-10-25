import axiosFetch from "@/config/axiosFetch";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Heart, MessagesSquare } from "lucide-react";
import { To, useNavigate } from "react-router-dom";

interface CircleTweetProps {
  id?: string;
  isLiked?: boolean;
  full_name?: string;
  username?: string;
  content?: string;
  photo_profile?: string;
  posted_at?: Date;
  to?: To;
}

// TODO: IF IMAGE

export default function CircleTweet({
  id,
  isLiked,
  full_name,
  username,
  content,
  photo_profile,
  to = "/",
}: CircleTweetProps) {
  const navigate = useNavigate();

  const { data: likes } = useQuery({
    queryKey: ["like", id],
    queryFn: async () => {
      const { data } = await axiosFetch.get(`/like/${id}`);

      return data.likes;
    },
  });

  const { data: replies } = useQuery({
    queryKey: ["reply", id],
    queryFn: async () => {
      const { data } = await axiosFetch.get(`/reply/${id}`);

      console.log(data);

      return data.replies;
    },
  });
  return (
    <Box
      as={Flex}
      py={4}
      px={8}
      gap={4}
      cursor="pointer"
      borderBottom="1px solid hsl(0 100% 100% / 20%)"
      onClick={() => navigate(to)}
    >
      <Avatar src={photo_profile} />
      <Box>
        <Box as={Flex} gap={2} align="center">
          <Text fontWeight={600} fontSize="lg" _hover={{ color: "pink" }}>
            {full_name}
          </Text>
          <Box
            as="span"
            display="flex"
            gap={2}
            fontSize="sm"
            color="whiteAlpha.600"
          >
            <Text>@{username}</Text>
            <Text>•</Text>
            <Text>10h</Text>
          </Box>
        </Box>
        <Box>
          <Text noOfLines={4} fontSize="sm">
            {content}
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
            <Heart className={`${isLiked ? "active-like" : ""}`} size={20} />
            <Text fontSize="sm">{likes?.length}</Text>
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
              {replies?.length} <Text as="span">Replies</Text>
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
