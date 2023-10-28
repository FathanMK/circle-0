import { Button, Text, Flex } from "@chakra-ui/react";
import { MessagesSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReplyButton({
  threadId,
  totalReplies,
}: {
  threadId: string;
  totalReplies: number;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/thread/${threadId}`);
  };

  return (
    <Button
      as={Flex}
      gap={2}
      px={0}
      cursor="default"
      bg="transparent"
      _hover={{ bg: "none", color: "cyan" }}
      color="whiteAlpha.600"
      onClick={handleClick}
    >
      <MessagesSquare size={20} />
      <Text fontSize="sm">
        {totalReplies} <Text as="span">Replies</Text>
      </Text>
    </Button>
  );
}
