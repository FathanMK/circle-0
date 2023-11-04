import { Box, Flex, Avatar, Text, Image, Spinner } from "@chakra-ui/react";
import { ReactNode } from "react";
import useFetchWithId from "@/hooks/useFetchWithId";
import getPostedTime from "@/utils/getPostedTime";
import MoreOptions from "./_component/MoreOptions/MoreOptions";
import LikeButton from "@/pages/Home/_components/Threads/_components/LikeButton/LikeButton";
import ReplyButton from "@/pages/Home/_components/Threads/_components/ReplyButton/ReplyButton";
import { useNavigate } from "react-router-dom";
import useToast from "@/hooks/useToast";

function ThreadContainer({
  photo_profile,
  children,
}: {
  photo_profile: string;
  children: ReactNode;
}) {
  return (
    <Box as={Flex} p={4} gap={4} cursor="pointer">
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
}: {
  full_name: string;
  username: string;
  created_at: string;
  threadId: string;
  isUser: boolean;
}) {
  return (
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
        <Text>{getPostedTime(created_at)}</Text>
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
          <Image src={image} w="full" objectFit="cover" borderRadius="lg" />
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

export default function Thread({
  threadId,
  userId,
}: {
  threadId: string;
  userId: string;
}) {
  const navigate = useNavigate();
  const toast = useToast();
  const { data: threadData, isLoading: isLoadingThreadData } = useFetchWithId({
    queryKey: "thread",
    id: threadId,
    fetchRoute: "/thread",
  });

  if (isLoadingThreadData)
    return (
      <Flex h="30vh" align="center" justify="center">
        <Spinner size="lg" />
      </Flex>
    );

  const thread = threadData?.thread;
  if (thread === undefined) {
    toast("Error", "Thread not found", "error");
    return navigate("/");
  }
  const isLiked = thread.likes?.some((like: any) => like.user?.id === userId);
  const totalLikes = thread.likes?.length;
  const totalReplies = thread.replies?.length;
  const isUser = thread.user?.id === userId;

  return (
    <ThreadContainer photo_profile={thread.user?.photo_profile!}>
      <ThreadHeader
        threadId={thread.id!}
        username={thread.user?.username!}
        full_name={thread.user?.full_name!}
        created_at={thread.created_at!}
        isUser={isUser}
      />
      <ThreadBody content={thread.content!} image={thread.image!} />
      <ThreadBottom
        isLiked={isLiked!}
        threadId={thread.id!}
        totalReplies={totalReplies!}
        totalLikes={totalLikes!}
      />
    </ThreadContainer>
  );
}
