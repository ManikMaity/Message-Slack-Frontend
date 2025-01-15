import { getDMMessages } from "@/apis/message";
import { useQuery } from "@tanstack/react-query";

function useFetchDMs({ roomId, workspaceId, page, limit }) {
  const {
    data: messages,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: [`dm-messages-${roomId}`, page, limit, roomId],
    queryFn: () => getDMMessages({ roomId, page, limit, workspaceId }),
  });

  return {
    messages,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess,
  };
}

export default useFetchDMs;
