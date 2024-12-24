import { joinWorkspaceByJoinCode } from "@/apis/workspace";
import { useQuery } from "@tanstack/react-query";

function useJoinWorkspaceByJoinCode(joinCode) {
  const { data, isSuccess, isError, error, isLoading, refetch } = useQuery({
    queryKey: ["joinWorkspaceByJoinCode", joinCode],
    queryFn: () => joinWorkspaceByJoinCode({ joinCode }),
    retry: false,
  });

  return {
    data,
    isSuccess,
    isError,
    error,
    isLoading,
    refetch
  };
}

export default useJoinWorkspaceByJoinCode;
