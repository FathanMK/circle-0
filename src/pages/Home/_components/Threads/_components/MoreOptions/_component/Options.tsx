import { MouseEvent } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Pencil, Trash } from "lucide-react";
import useOptions from "./hooks/useOptions";
import EditModal from "./_component/EditModal/EditModal";

export default function Options({ threadId }: { threadId: string }) {
  const { handleDeleteThread, onClose, onOpen, isOpen } = useOptions(threadId);

  const handleEditThread = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <>
      <Button
        as={Flex}
        gap={2}
        color="teal"
        bg="transparent"
        _hover={{ bg: "transparent", color: "purple" }}
        onClick={handleEditThread}
      >
        <Pencil />
        <Text>Edit</Text>
      </Button>
      <Button
        as={Flex}
        gap={2}
        color="red"
        bg="transparent"
        _hover={{ bg: "transparent", color: "purple" }}
        onClick={handleDeleteThread}
      >
        <Trash />
        <Text>Delete</Text>
      </Button>
      <EditModal isOpen={isOpen} onClose={onClose} threadId={threadId} />
    </>
  );
}
