import { useQuery } from "@tanstack/react-query";

import { getMessageReactions } from "@/apis/reaction";

function useGetMessageReactions({ messageId }) {
  const {data, isLoading, isError, isSuccess, error} = useQuery({
    queryKey: ["getMessageReactions", messageId],
    queryFn: async () => await getMessageReactions(messageId),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    error
  };
}

export default useGetMessageReactions;
