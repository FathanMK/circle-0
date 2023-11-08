import { MouseEvent } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Pencil, Trash } from "lucide-react";
import useOptions from "./hooks/useOptions";
import EditModal from "./_component/EditModal/EditModal";

export default function Options({ threadId }: { threadId: string }) {
  const { handleDeleteThread, onClose, onOpen, isOpen, isLoading } =
    useOptions(threadId);

  const handleEditThread = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <>
      <Button
        as={Flex}
        gap={2}
        color="white"
        bg="transparent"
        _hover={{ bg: "transparent", color: "blue" }}
        onClick={handleEditThread}
      >
        <Pencil />
        <Text>Edit</Text>
      </Button>
      <Button
        isDisabled={isLoading}
        as={Flex}
        gap={2}
        bg="transparent"
        color="white"
        _hover={{ bg: "transparent", color: "red" }}
        onClick={handleDeleteThread}
      >
        <Trash />
        <Text>Delete</Text>
      </Button>
      <EditModal isOpen={isOpen} onClose={onClose} threadId={threadId} />
    </>
  );
}
