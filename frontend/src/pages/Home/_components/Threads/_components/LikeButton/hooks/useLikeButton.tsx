import axiosFetch from "@/config/axiosFetch";
import useToast from "@/hooks/useToast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { MouseEvent } from "react";

export default function useLikeButton({
  isLiked,
  threadId,
}: {
  isLiked: boolean;
  threadId: string;
}) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { accessToken } = useSelector((state: RootState) => state.user);
  const mutation = useMutation({
    mutationFn: (newLike: any) => {
      return axiosFetch.post("/like", newLike, {
        headers: {
          "x-access-token": accessToken,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      queryClient.invalidateQueries({ queryKey: ["thread", threadId] });
      toast("Success", "You liked this thread", "success");
    },
    onError: () => {
      toast("Error", "Failed to like this thread", "error");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (newLike: any) => {
      return axiosFetch.post("/delete-like", newLike, {
        headers: {
          "x-access-token": accessToken,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      queryClient.invalidateQueries({ queryKey: ["thread", threadId] });
      toast("Success", "You unlike this thread", "success");
    },
    onError: () => {
      toast("Error", "Failed to unlike this thread", "error");
    },
  });
  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isLiked) {
      mutation.mutate({ threadId });
      return;
    }
    deleteMutation.mutate({ threadId });
  };

  return {
    handleLike,
  };
}
