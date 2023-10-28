import {
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Replies from "./_components/Replies/Replies";
import MainThread from "./_components/Thread/Thread";

export default function Thread() {
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.id;
  const { id: threadId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Box as={Flex} align="center" gap={2} p={4}>
        <Button
          bg="transparent"
          color="accent"
          onClick={() => navigate(-1)}
          _hover={{ bg: "none" }}
          _active={{ color: "" }}
        >
          <ArrowLeft size={30} />
        </Button>
      </Box>
      <Box as={Flex} direction="column" overflow="hidden" gap={4} px={4}>
        <Box overflowY="scroll">
          <MainThread userId={userId!} threadId={threadId!} />
          {/* <CreateReplies
            threadId={id!}
            userId={user?.id!}
            photo_profile={user?.photo_profile!}
          /> */}
          <Box>
            <Replies threadId={threadId!} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
