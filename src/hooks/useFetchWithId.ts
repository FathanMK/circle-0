import { useQuery } from "@tanstack/react-query";
import axiosFetch from "@/config/axiosFetch";

interface IUseFetchWithId {
  id?: string;
  queryKey?: string;
  fetchRoute?: string;
}

export default function useFetchWithId(obj: IUseFetchWithId) {
  const { queryKey, id, fetchRoute } = obj;
  const { data, isLoading } = useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const { data } = await axiosFetch.get(`${fetchRoute}/${id}`);
      return data;
    },
  });

  return { data, isLoading };
}
