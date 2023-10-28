import { useQuery } from "@tanstack/react-query";
import axiosFetch from "@/config/axiosFetch";

export default function useFetch({
  queryKey,
  fetchRoutes,
}: {
  queryKey: string;
  fetchRoutes: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await axiosFetch.get(fetchRoutes);
      return data;
    },
  });

  return { data, isLoading };
}
