import { verifyEmail } from "@/apis/user";
import { useQuery } from "@tanstack/react-query";

function useVerifyEmail(hash) {
  const { data, isSuccess, isError, error, isLoading, refetch } = useQuery({
    queryFn: async () => await verifyEmail(hash),
    queryKey: ["verifyEmail", hash],
    retry: false,
  });

  return {
    data,
    isSuccess,
    isError,
    error,
    isLoading,
    refetch,
  };
}

export default useVerifyEmail;
