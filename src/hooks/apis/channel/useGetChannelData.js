import { useQuery } from "@tanstack/react-query";

import { getChannelDetails } from "@/apis/workspace";

function useGetChannelData(channelId) {
  const {
    data: channelData,
    isLoading,
    isError,
    isSuccess,
    refetch,
    error,
  } = useQuery({
    queryFn: () => getChannelDetails({ channelId }),
    queryKey: [`channelData-${channelId}`, channelId],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    channelData,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch
  };
}

export default useGetChannelData;
