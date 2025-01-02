import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkspace } from "@/apis/workspace";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

function useCreateWorkspace() {

  const queryClient = useQueryClient();

  const {
    mutateAsync: createWorkspaceMutateAsync,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: createWorkspace,
    onSuccess: (data) => {
      toast({
        title: `${data?.name} workspace created`,
        description: "Successfully created workspace",
        type: "success",
      });

      queryClient.invalidateQueries(["workspaces"]);
    },
    onError: (error) => {
      toast({
        title: "Error while creating workspace",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });

  return { createWorkspaceMutateAsync, isSuccess, isPending, isError, error };
}

export default useCreateWorkspace;
