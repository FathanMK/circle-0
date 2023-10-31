import {
  Flex,
  Avatar,
  Input,
  Box,
  Button,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { ImagePlus, X } from "lucide-react";
import useCreateReply from "./hooks/useCreateReply";

export default function CreateReply({
  photo_profile,
  threadId,
}: {
  threadId: string;
  photo_profile: string;
}) {
  const {
    reply,
    image,
    setImage,
    mutation,
    handleReplyChange,
    handlePost,
    handleFileUpload,
  } = useCreateReply(threadId!);

  return (
    <Flex px={4} my={4} direction="column" gap={4}>
      <Box as={Flex} align="center">
        <Avatar src={photo_profile} />
        <Input
          value={reply}
          onChange={handleReplyChange}
          border="none"
          placeholder="Type your reply!"
          _focusVisible={{ border: "none" }}
        />
        <Box as={Flex} align="center" gap={4}>
          <Box
            as={Button}
            bg="transparent"
            cursor="pointer"
            color="#04a51e"
            _hover={{ color: "purple", bg: "transparent" }}
            onClick={handleFileUpload}
          >
            <ImagePlus style={{ transition: "color 150ms ease-in-out" }} />
          </Box>
          <Button
            isDisabled={reply === "" && image === null}
            onClick={handlePost}
            bg="accent"
            mx={2}
            color="white"
            borderRadius="full"
            _hover={{ bg: "purple" }}
          >
            {mutation.isPending ? <Spinner /> : "Post"}
          </Button>
        </Box>
      </Box>
      {image && (
        <Box as={Flex} align="center" justify="center">
          <Box w="fit-content" position="relative">
            <Button
              bg="transparent"
              _hover={{ bg: "transparent" }}
              position="absolute"
              top={0}
              right={0}
              onClick={() => setImage(null)}
            >
              <X color="white" />
            </Button>
            <Image src={URL.createObjectURL(image)} />
          </Box>
        </Box>
      )}
    </Flex>
  );
}
