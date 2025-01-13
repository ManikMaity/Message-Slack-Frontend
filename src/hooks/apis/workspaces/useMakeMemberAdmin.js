import { useMutation } from "@tanstack/react-query";

import { makeMemberAdmin } from "@/apis/workspace";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
function useMakeMemberAdmin() {
  const {
    mutateAsync: makeMemberAdminMutateAsync,
    isPending: makeMemberAdminPending,
  } = useMutation({
    mutationFn: makeMemberAdmin,
    onSuccess: (data) => {
      toast({
        description: "Member is made admin successfully",
        type: "success",
      });
    },
    onError: (err) => {
      toast({
        description: getErrorMessage(err),
        status: "error",
      });
    },
  });

  return {
    makeMemberAdminMutateAsync,
    makeMemberAdminPending,
  };
}

export default useMakeMemberAdmin;
