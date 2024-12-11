import {useQuery } from "@tanstack/react-query";

import { getAllUserWorkspaces } from "@/apis/workspace";

function useGetUserWorkspace() {
  const {
    data: workspacesData,
    isError,
    isLoading,
    isSuccess,
    refetch,
    error,
  } = useQuery({
    queryKey: ["workspaces"], 
    queryFn: getAllUserWorkspaces, 
    staleTime : 1000 * 60 * 10, // 10 minutes
  });


  return {
    workspacesData,
    isError,
    isLoading,
    isSuccess,
    refetch,
    error
  };
}

export default useGetUserWorkspace;
