import { Box, Flex, Avatar, Text, Image } from "@chakra-ui/react";
import { ReactNode } from "react";
import getPostedTime from "@/utils/getPostedTime";
import MoreOptions from "./_components/MoreOptions/MoreOptions";
import useFetchWithId from "@/hooks/useFetchWithId";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function ReplyContainer({
  children,
  photo_profile,
}: {
  children: ReactNode;
  photo_profile: string;
}) {
  return (
    <Box as={Flex} p={4} gap={4}>
      <Avatar src={photo_profile} />
      <Box w="full">{children}</Box>
    </Box>
  );
}

function ReplyHeader({
  full_name,
  username,
  created_at,
  replyId,
  threadId,
  isUser,
}: {
  full_name: string;
  username: string;
  created_at: string;
  replyId: string;
  threadId: string;
  isUser: boolean;
}) {
  return (
    <Box as={Flex} gap={2} align="center">
      <Text fontWeight={600} fontSize="lg">
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
      {isUser && <MoreOptions threadId={threadId} replyId={replyId} />}
    </Box>
  );
}

function ReplyBody({ content, image }: { content: string; image: string }) {
  return (
    <Box as={Flex} direction="column" gap={4}>
      {content && <Text noOfLines={4}>{content}</Text>}
      {image && (
        <Box py={2}>
          <Image src={image} borderRadius="lg" />
        </Box>
      )}
    </Box>
  );
}

export default function Replies({ threadId }: { threadId: string }) {
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.id;
  const { data } = useFetchWithId({
    id: threadId,
    queryKey: "replies",
    fetchRoute: "/replies",
  });
  const replies = data?.replies;
  return (
    <>
      {replies?.map((item: Reply) => {
        const isUser = item.user?.id === userId;
        return (
          <ReplyContainer
            key={item.id}
            photo_profile={item.user?.photo_profile!}
          >
            <ReplyHeader
              full_name={item.user?.full_name!}
              username={item.user?.username!}
              created_at={item.created_at!}
              replyId={item.id!}
              threadId={threadId!}
              isUser={isUser}
            />
            <ReplyBody content={item.content!} image={item.image!} />
          </ReplyContainer>
        );
      })}
    </>
  );
}
