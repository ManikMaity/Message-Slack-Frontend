import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addChannelToWorkspace } from "@/apis/workspace";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useNavigate } from "react-router-dom";

function useAddChannelToWorkspace() {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

  const {
    mutateAsync: addChannelToWorkspaceMutateAsync,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["add-channel-to-workspace"],
    mutationFn: addChannelToWorkspace,
    onSuccess: (data) => {
      toast({
        title: "Channel added to workspace",
        description: "Successfully added channel to workspace",
        type: "success",
      });
      queryClient.refetchQueries(`workspace-data-${data?._id}`);
    },
    onError: (error) => {
      toast({
        title: "Error while adding channel to workspace",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });

  return {
    addChannelToWorkspaceMutateAsync,
    isSuccess,
    isPending,
    isError,
    error,
  };
}

export default useAddChannelToWorkspace;
