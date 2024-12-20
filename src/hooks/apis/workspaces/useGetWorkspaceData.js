import { useQuery } from "@tanstack/react-query";

import { getWorkspaceData } from "@/apis/workspace";

function useGetWorkspaceData(id) {
  const {
    data: workspaceData,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch
  } = useQuery({
    queryKey: [`workspace-data-${id}`, id],
    queryFn: () => getWorkspaceData(id),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    workspaceData,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch
  };
}

export default useGetWorkspaceData;
