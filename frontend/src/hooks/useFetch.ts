import { useQuery } from "@tanstack/react-query";
import axiosFetch from "@/config/axiosFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function useFetch({
  queryKey,
  fetchRoutes,
}: {
  queryKey: string;
  fetchRoutes: string;
}) {
  const { accessToken } = useSelector((state: RootState) => state.user);
  const { data, isLoading, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await axiosFetch.get(fetchRoutes, {
        headers: {
          "x-access-token": accessToken,
        },
      });
      return data;
    },
  });

  return { data, isLoading, refetch };
}
