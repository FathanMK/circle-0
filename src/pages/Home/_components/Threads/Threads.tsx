import { Avatar, Box, Flex, Text, Image, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getPostedTime from "@/utils/getPostedTime";
import type { IThreadContainerProps, IThreadHeaderProps } from "./interface";
import MoreOptions from "./_components/MoreOptions/MoreOptions";
import ReplyButton from "./_components/ReplyButton/ReplyButton";
import LikeButton from "./_components/LikeButton/LikeButton";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import axiosFetch from "@/config/axiosFetch";
import { useDispatch } from "react-redux";
import { getThreads } from "@/slices/thread/threadSlice";

function ThreadContainer({
  to,
  children,
  photo_profile,
}: IThreadContainerProps) {
  const navigate = useNavigate();
  return (
    <Box
      as={Flex}
      p={4}
      gap={4}
      cursor="pointer"
      borderBottom="1px solid hsl(0 100% 100% / 20%)"
      onClick={() => navigate(`/thread/${to}`)}
    >
      <Avatar src={photo_profile} />
      <Box w="full">{children}</Box>
    </Box>
  );
}

function ThreadHeader({
  full_name,
  username,
  created_at,
  threadId,
  isUser,
}: IThreadHeaderProps) {
  return (
    <Box as={Flex} gap={2} align="center">
      <Text fontWeight={600} fontSize="lg" _hover={{ color: "purple" }}>
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
        <Text>{getPostedTime(created_at as string)}</Text>
      </Box>
      {isUser && <MoreOptions threadId={threadId} />}
    </Box>
  );
}

function ThreadBody({ content, image }: { content: string; image: string }) {
  return (
    <Box as={Flex} direction="column" gap={4}>
      {content && <Text noOfLines={4}>{content}</Text>}
      {image && (
        <Box py={2}>
          <Image
            src={image}
            w="full"
            maxH="300px"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>
      )}
    </Box>
  );
}

function ThreadBottom({
  isLiked,
  totalLikes,
  threadId,
  totalReplies,
}: {
  isLiked: boolean;
  totalLikes: number;
  threadId: string;
  totalReplies: number;
}) {
  return (
    <Box as={Flex} gap={4}>
      <LikeButton
        threadId={threadId}
        isLiked={isLiked}
        totalLikes={totalLikes}
      />
      <ReplyButton threadId={threadId} totalReplies={totalReplies} />
    </Box>
  );
}

export default function Threads() {
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state: RootState) => state.user);
  const { threads } = useSelector((state: RootState) => state.thread);
  const userId = user?.id;
  const { isLoading } = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const { data } = await axiosFetch.get("/threads?limit=25", {
        headers: {
          "x-access-token": accessToken,
        },
      });
      dispatch(getThreads(data.threads));
      return data.threads;
    },
  });

  if (isLoading)
    return (
      <Flex h="60vh" align="center" justify="center">
        <Spinner />
      </Flex>
    );

  if (threads?.length === 0)
    return (
      <Flex h="60vh" align="center" justify="center">
        <Text fontSize="2xl" fontWeight={600}>
          :(
        </Text>
      </Flex>
    );

  return (
    <>
      {!isLoading &&
        threads?.map((item: Thread) => {
          const isLiked = item.likes?.some(
            (like: any) => like.user?.id === userId
          );
          const isUser = item.user?.id === userId;
          const totalLikes = item.likes?.length;
          const totalReplies = item.replies?.length;
          return (
            <ThreadContainer
              key={item.id}
              to={item.id!}
              photo_profile={item.user?.photo_profile!}
            >
              <ThreadHeader
                threadId={item.id!}
                username={item.user?.username!}
                full_name={item.user?.full_name!}
                created_at={item.created_at!}
                isUser={isUser}
              />
              <ThreadBody content={item.content!} image={item.image!} />
              <ThreadBottom
                isLiked={isLiked!}
                threadId={item.id!}
                totalReplies={totalReplies!}
                totalLikes={totalLikes!}
              />
            </ThreadContainer>
          );
        })}
    </>
  );
}
