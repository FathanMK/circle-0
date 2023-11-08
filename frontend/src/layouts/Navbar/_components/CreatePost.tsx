import { useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Avatar,
  Button,
  Box,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { ImagePlus } from "lucide-react";
import { RootState } from "@/store";

export default function CreatePost({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="lighterNewBg" color="white">
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as={Flex} align="flex-start">
            <Avatar size="sm" src={user?.photo_profile} />
            <Textarea
              border="none"
              placeholder="What is happening!?"
              _focusVisible={{ border: "none" }}
              resize="none"
            />
          </Box>
        </ModalBody>

        <ModalFooter alignItems="center" justifyContent="space-between">
          <Box
            as={Button}
            bg="transparent"
            cursor="pointer"
            color="#04a51e"
            pl={0}
            _hover={{ color: "purple", bg: "transparent" }}
          >
            <ImagePlus style={{ transition: "color 150ms ease-in-out" }} />
          </Box>
          <Button
            bg="accent"
            mx={2}
            color="white"
            borderRadius="full"
            _hover={{ bg: "purple" }}
          >
            POST
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
