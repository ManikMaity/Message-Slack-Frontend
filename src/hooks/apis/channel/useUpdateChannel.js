import { updateChannel } from "@/apis/channel";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation } from "@tanstack/react-query";

function useUpdateChannelName() {
  const {
    mutateAsync: updateChannelNameAsync,
    isPaused,
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
    isPaused,
    isError,
    isSuccess,
  };
}

export default useUpdateChannelName;
