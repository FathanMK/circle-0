import { MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import axiosFetch from "@/config/axiosFetch";
import { RootState } from "@/store";

export default function useOptions(threadId: string) {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState(false);
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
      toast("Please Wait", "Deleting!", "info");
      setLoading(true);
      setTimeout(() => {
        toast("Success", "Thread is successfully deleted!", "success");
        queryClient.invalidateQueries({ queryKey: ["threads"] });
        queryClient.invalidateQueries({ queryKey: ["threads"] });
        navigate("/");
        onClose();
        setLoading(false);
      }, 3000);
    },
    onError: () => {
      toast("Error", "Failed to delete thread!", "error");
    },
  });

  const handleDeleteThread = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutation.mutate();
  };

  return { isOpen, onClose, onOpen, isLoading, handleDeleteThread };
}
