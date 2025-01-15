import { useQuery } from "@tanstack/react-query";

import { getMemberDeatils } from "@/apis/member";

function useGetMemberDetails({ workspaceId, memberId }) {
  const {
    data: memberDetails,
    isLoading: isMemberDetailsLoading,
    isError: isMemberDetailsError,
    isSuccess: isMemberDetailsSuccess,
    error: memberDetailsError,
    refetch,
  } = useQuery({
    queryKey: ["getMemberDetails", memberId],
    queryFn: async () => await getMemberDeatils({ workspaceId, memberId }),
    staleTime: 1000 * 60 * 5,
  });

  return {
    memberDetails,
    isMemberDetailsLoading,
    isMemberDetailsError,
    isMemberDetailsSuccess,
    memberDetailsError,
    refetch
  };
}

export default useGetMemberDetails;
