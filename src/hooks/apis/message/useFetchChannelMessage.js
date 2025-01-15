import { getChannelMessages } from "@/apis/message";
import { useQuery } from "@tanstack/react-query";

function useFetchChannelMessage({ channelId, workspaceId, page, limit }) {

  const {data : messages, isLoading, isError, error, refetch, isSuccess} = useQuery({
    queryKey: [`channel-messages-${channelId}`, page, limit, channelId],
    queryFn: () => getChannelMessages({ channelId, page, limit, workspaceId }),
  });

  return {
    messages,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess
  };
}

export default useFetchChannelMessage;
