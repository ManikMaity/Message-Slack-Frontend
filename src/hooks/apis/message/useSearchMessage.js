import { useQuery } from "@tanstack/react-query";

import { searchMessages } from "@/apis/message";

function useSearchMessage({ workspaceId, searchQuery }) {
  const {
    data: messages,
    isLoading: isMessagesLoading,
    isError: isMessagesError,
    isSuccess: isMessagesSuccess,
    error: messagesError,
    refetch
  } = useQuery({
    queryKey: ["searchMessage", workspaceId, searchQuery],
    queryFn: async () => await searchMessages({ workspaceId, searchQuery }),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    messages,
    isMessagesLoading,
    isMessagesError,
    isMessagesSuccess,
    messagesError,
    refetch
  };
}

export default useSearchMessage;
