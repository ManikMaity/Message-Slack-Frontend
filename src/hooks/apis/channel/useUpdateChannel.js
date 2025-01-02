import { useMutation } from "@tanstack/react-query";

import { updateChannel } from "@/apis/channel";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

function useUpdateChannelName() {
  const {
    mutateAsync: updateChannelNameAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updateChannel,
    onSuccess: (data) => {
      toast({
        title: "Channel name updated successfully",
        description: `Channel name updated to ${data?.name} successfully`,
      });
    },

    onError: (error) => {
      toast({
        title: "Error while updating channel name",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });

  return {
    updateChannelNameAsync,
    isPending,
    isError,
    isSuccess,
  };
}

export default useUpdateChannelName;
