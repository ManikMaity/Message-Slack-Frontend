import { useMutation } from "@tanstack/react-query";

import { leaveWorkspace } from "@/apis/workspace";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useNavigate } from "react-router-dom";

function useLeaveWorkspace() {
  const navigator = useNavigate();
  const { mutateAsync: leaveWorkspaceMutateAync, isPending } = useMutation({
    mutationFn: leaveWorkspace,
    onSuccess: (data) => {
      console.log(data);
      toast({
        description: "You have left the workspace",
        type: "success",
      });
      navigator("/workspaces");
    },
    onError: (err) => {
      toast({
        description: getErrorMessage(err),
        status: "error",
      });
    },
  });

  return {
    leaveWorkspaceMutateAync,
    isPending,
  };
}

export default useLeaveWorkspace;
