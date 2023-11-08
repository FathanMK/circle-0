import { useState, ChangeEvent } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useToast from "@/hooks/useToast";
import axiosFetch from "@/config/axiosFetch";
import { RootState } from "@/store";

export default function useCreateThread() {
  const queryClient = useQueryClient();
  const { user, accessToken } = useSelector((state: RootState) => state.user);
  const [thread, setThread] = useState("");
  const [image, setImage] = useState<File | null>(null);
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
      toast("Please Wait", "Creating Thread!", "info");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["threads"] });
        queryClient.invalidateQueries({ queryKey: ["threads"] });
        
      }, 3000);
    },
    onError: (error: any) =>
      toast("Error", error.response.data.message, "error"),
  });

  const handleThreadChange = (e: ChangeEvent<HTMLInputElement>) => {
    setThread(e.target.value);
  };

  const handlePost = () => {
    form.append("image", image as File);
    form.append("content", thread);
    mutation.mutate(form);
    setThread("");
    setImage(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  
  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.id = "image";
    input.name = "image";
    //@ts-ignore
    input.onchange = handleFileChange;
    input.click();
  };

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
