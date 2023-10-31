import { MouseEvent } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import axiosFetch from "@/config/axiosFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function useOptions(threadId: string) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { accessToken } = useSelector((state: RootState) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useMutation({
    mutationFn: () => {
      return axiosFetch.delete(`/thread/${threadId}`, {
        headers: {
          "x-access-token": accessToken,
        },
      });
    },
    onSuccess: () => {
      toast("Success", "Thread is successfully deleted!", "success");
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
    onError: () => {
      toast("Error", "Failed to delete thread!", "error");
    },
  });

  const handleDeleteThread = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutation.mutate();
  };

  return { isOpen, onClose, onOpen, handleDeleteThread };
}
