import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useToast from "@/hooks/useToast";
import axiosFetch from "@/config/axiosFetch";
import { RootState } from "@/store";

export default function useCreateThread() {
  const { user, accessToken } = useSelector((state: RootState) => state.user);
  const [thread, setThread] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const toast = useToast();
  const form = new FormData();

  const mutation = useMutation({
    mutationFn: (newThread: any) =>
      axiosFetch.post("/thread", newThread, {
        headers: {
          "x-access-token": accessToken,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads-cache"] });
      toast("Success", "Thread created", "success");
    },
    onError: (error: any) =>
      toast("Error", error.response.data.message, "error"),
  });

  const handleThreadChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setThread(e.target.value);
  }, []);

  const handlePost = useCallback(() => {
    form.append("image", image as File);
    form.append("content", thread);
    mutation.mutate(form);
    setThread("");
    setImage(null);
  }, [thread, image, mutation, form]);

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

  useEffect(() => {
    return () => {
      form.delete("image");
      form.delete("content");
    };
  }, [form]);

  return {
    thread,
    image,
    setImage,
    mutation,
    user,
    handlePost,
    handleThreadChange,
    handleFileUpload,
  };
}
