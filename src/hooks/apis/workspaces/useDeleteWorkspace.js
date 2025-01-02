import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteWorkspace } from "@/apis/workspace";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useNavigate } from "react-router-dom";

function useDeleteWorkspace() {

  const navigator = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteWorkspaceMutateAsync,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: deleteWorkspace,
    onSuccess: (data) => {
      toast({
        title: `${data?.name} workspace deleted`,
        description: "Successfully deleted workspace",
        type: "success",
      });
      queryClient.invalidateQueries(["workspaces"]);
      navigator("/workspaces");
    },
    onError: (error) => {
      toast({
        title: "Error while deleting workspace",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });

  return { deleteWorkspaceMutateAsync, isSuccess, isPending, isError, error };
}

export default useDeleteWorkspace;
