import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Flex, Avatar, Input, Box, Button } from "@chakra-ui/react";
import { ImagePlus } from "lucide-react";
import axiosFetch from "@/config/axiosFetch";

export default function CreateThread() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    thread: "",
  });

  const mutation = useMutation({
    mutationFn: (newThread: { content: string }) => {
      return axiosFetch.post("/thread", newThread);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads-cache"] });
    },
    onError: () => alert("error"),
  });

  const handleComposeTweet = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, thread: e.target.value });
  };

  const handlePost = () => {
    mutation.mutate({ content: form.thread });
    setForm({ ...form, thread: "" });
  };

  return (
    <Flex px={8} my={4} align="center">
      <Avatar />
      <Input
        value={form.thread}
        onChange={handleComposeTweet}
        border="none"
        placeholder="What is happening!?"
        _focusVisible={{ border: "none" }}
      />
      <Box as={Flex} align="center" gap={4}>
        <Box cursor="pointer" color="#04a51e" _hover={{ color: "purple" }}>
          <ImagePlus style={{ transition: "color 150ms ease-in-out" }} />
        </Box>
        <Button
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
