import { useMutation } from "@tanstack/react-query";

import { deleteWorkspace } from "@/apis/workspace";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

function useDeleteWorkspace() {
  const {
    mutateAsync: deleteWorkspaceMutateAsync,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: deleteWorkspace,
    onSuccess: (data) => {
      console.log("Successfully deleted workspace", data);
      toast({
        title: `${data?.name} workspace deleted`,
        description: "Successfully deleted workspace",
        type: "success",
      });
    },
    onError: (error) => {
      console.log("Error while deleting workspace", error);
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
