import axiosFetch from "@/config/axiosFetch";
import { useMutation } from "@tanstack/react-query";

export default function useCardSuggested() {
  const mutation = useMutation({
    mutationFn: (newFollowing: any) =>
      axiosFetch.post("/following", newFollowing),
    onSuccess: () => alert("success"),
  });

  
}
