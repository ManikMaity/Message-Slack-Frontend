import { useMutation } from "@tanstack/react-query";

import { deleteChannel } from "@/apis/channel";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

function useDeleteChannel() {
  const {
    isPaused,
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
    },
    onError: (error) => {
      toast({
        title: "Error while deleting channel",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });

  return { isPaused, isSuccess, isError, deleteChannelMutateAsync };
}

export default useDeleteChannel;
