import { Flex, Avatar, Input, Box, Button } from "@chakra-ui/react";
import { ImagePlus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosFetch from "@/config/axiosFetch";
import useToast from "@/hooks/useToast";

interface ReplyMutation {
  content?: string;
  image?: string;
  userId?: string;
  threadId?: string;
}

export default function CreateReplies({
  userId,
  threadId,
  photo_profile,
}: {
  userId: string;
  threadId: string;
  photo_profile: string;
}) {
  const [reply, setReply] = useState("");
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleReplyThread = (e: ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: (newReply: ReplyMutation) =>
      axiosFetch.post("/reply", newReply),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reply"] }),
    onError: (error: any) =>
      toast("Error", error.response.data.message, "error"),
  });

  const handlePost = () => {
    const newReply = {
      content: reply,
      userId,
      threadId,
    };
    mutation.mutate(newReply);
    setReply("");
  };

  return (
    <Flex px={8} my={4} align="center">
      <Avatar src={photo_profile} />
      <Input
        value={reply}
        onChange={handleReplyThread}
        border="none"
        placeholder="What is happening!?"
        _focusVisible={{ border: "none" }}
      />
      <Box as={Flex} align="center" gap={4}>
        <Box cursor="pointer" color="#04a51e" _hover={{ color: "purple" }}>
          <ImagePlus style={{ transition: "color 150ms ease-in-out" }} />
        </Box>
        <Button
          isDisabled={reply === ""}
          onClick={handlePost}
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
  );
}
