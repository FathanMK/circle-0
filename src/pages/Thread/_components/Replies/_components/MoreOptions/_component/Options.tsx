import { MouseEvent } from "react";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Pencil, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import axiosFetch from "@/config/axiosFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import EditModal from "./_component/EditModal/EditModal";

export default function Options({
  replyId,
  threadId,
}: {
  replyId: string;
  threadId: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { accessToken } = useSelector((state: RootState) => state.user);
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return axiosFetch.delete(`/reply/${replyId}`, {
        headers: {
          "x-access-token": accessToken,
        },
      });
    },
    onSuccess: () => {
      toast("Success", "Successfully delete reply!", "success");
      queryClient.invalidateQueries({ queryKey: ["replies", threadId] });
      queryClient.invalidateQueries({ queryKey: ["thread", threadId] });
    },
    onError: () => {
      toast("Error", "Failed to delete thread!", "error");
    },
  });

  const handleDeleteThread = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutation.mutate();
  };

  const handleEditThread = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <>
      <Button
        as={Flex}
        gap={2}
        bg="transparent"
        color="white"
        _hover={{ bg: "transparent", color: "blue" }}
        cursor="pointer"
        onClick={handleEditThread}
      >
        <Pencil />
        <Text>Edit</Text>
      </Button>
      <Button
        as={Flex}
        gap={2}
        bg="transparent"
        color="white"
        _hover={{ bg: "transparent", color: "red" }}
        cursor="pointer"
        onClick={handleDeleteThread}
      >
        <Trash />
        <Text>Delete</Text>
      </Button>
      <EditModal
        isOpen={isOpen}
        onClose={onClose}
        replyId={replyId}
        threadId={threadId}
      />
    </>
  );
}
