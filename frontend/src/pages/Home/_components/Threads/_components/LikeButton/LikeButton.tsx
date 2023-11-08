import { Button, Flex, Text } from "@chakra-ui/react";
import { Heart } from "lucide-react";
import useLikeButton from "./hooks/useLikeButton";

export default function LikeButton({
  isLiked,
  totalLikes,
  threadId,
}: {
  isLiked: boolean;
  totalLikes: number;
  threadId: string;
}) {
  const { handleLike } = useLikeButton({ isLiked, threadId });
  return (
    <Button
      as={Flex}
      gap={2}
      px={0}
      cursor="pointer"
      bg="transparent"
      _hover={{ bg: "none", color: "red" }}
      color="whiteAlpha.600"
      onClick={handleLike}
    >
      <Heart className={`${isLiked ? "active-like" : ""}`} size={20} />
      <Text fontSize="sm">{totalLikes}</Text>
    </Button>
  );
}
