import { useSelector } from "react-redux";
import { useCallback, useState, ChangeEvent } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import axiosFetch from "@/config/axiosFetch";
import { RootState } from "@/store";

export default function useCreateReply(threadId: string) {
  const { user, accessToken } = useSelector((state: RootState) => state.user);
  const [reply, setReply] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const toast = useToast();
  const form = new FormData();

  const mutation = useMutation({
    mutationFn: (newReply: any) =>
      axiosFetch.post(`/reply/${threadId}`, newReply, {
        headers: {
          "x-access-token": accessToken,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thread", threadId] });
      queryClient.invalidateQueries({ queryKey: ["replies", threadId] });
      toast("Success", "Reply created", "success");
    },
    onError: (error: any) =>
      toast("Error", error.response.data.message, "error"),
  });

  const handleReplyChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
  }, []);

  const handlePost = useCallback(() => {
    form.append("image", image as File);
    form.append("content", reply);
    mutation.mutate(form);
    setReply("");
    setImage(null);
  }, [reply, image, mutation, form]);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setImage(file);
      }
    },
    []
  );

  const handleFileUpload = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.id = "image";
    input.name = "image";
    //@ts-ignore
    input.onchange = handleFileChange;
    input.click();
  }, [handleFileChange]);

  return {
    reply,
    image,
    setImage,
    mutation,
    user,
    handlePost,
    handleReplyChange,
    handleFileUpload,
  };
}
