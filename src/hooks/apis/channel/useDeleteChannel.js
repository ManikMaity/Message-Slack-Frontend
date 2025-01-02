import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteChannel } from "@/apis/channel";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useNavigate } from "react-router-dom";

function useDeleteChannel() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    isPending,
    isSuccess,
    isError,
    mutateAsync: deleteChannelMutateAsync,
  } = useMutation({
    mutationFn: deleteChannel,
    onSuccess: (data) => {
      toast({
        title: "Channel deleted successfully",
        description: `Channel ${data?.name} deleted successfully`,
        type: "success",
      });
      if (data?.workspaceId?.channels.length === 0) {
        navigate(`/workspaces`);
      } else {
        navigate(
          `/workspace/${data?.workspaceId?._id}/channel/${data?.workspaceId?.channels[0]}`
        );
      }
      queryClient.refetchQueries([`workspace-data-${data?.workspaceId?._id}`]);
    },
    onError: (error) => {
      toast({
        title: "Error while deleting channel",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });

  return { isPending, isSuccess, isError, deleteChannelMutateAsync };
}

export default useDeleteChannel;
