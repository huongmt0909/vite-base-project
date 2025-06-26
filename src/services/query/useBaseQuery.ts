import { useQuery, type QueryKey, type UseQueryOptions } from "@tanstack/react-query";

export function useBaseQuery<TData = unknown, TError = unknown, TParams = void>(
  queryKey: QueryKey,
  queryFn: (params: TParams) => Promise<TData>,
  params: TParams,
  options?: Omit<UseQueryOptions<TData, TError, TData, QueryKey>, "queryKey" | "queryFn">,
) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: () => queryFn(params),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
}
