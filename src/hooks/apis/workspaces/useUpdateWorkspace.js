import { useMutation } from "@tanstack/react-query";
import React from "react";

import { updateWorkspace } from "@/apis/workspace";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

function useUpdateWorkspace() {
  const {mutateAsync: updateWorkspaceMutateAsync, isSuccess, isPending, isError, error} = useMutation({
    mutationFn: updateWorkspace,
    onSuccess: (data) => {
      console.log("Successfully updated workspace", data);
      toast({
        title: `${data?.name || ""} workspace updated`,
        description: "Successfully updated workspace",
        type: "success",
      });
    },
    onError: (error) => {
      console.log("Error while updating workspace", error);
      toast({
        title: "Error while updating workspace",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });

  return { updateWorkspaceMutateAsync, isSuccess, isPending, isError, error };
}

export default useUpdateWorkspace;
