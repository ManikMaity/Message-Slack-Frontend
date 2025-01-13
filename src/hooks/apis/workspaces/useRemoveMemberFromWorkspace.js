import { removeMembersFromWorkspace } from "@/apis/workspace";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useRemoveMemberFromWorkspace() {

    const queryClient = useQueryClient();
    const {id} = useParams();

  const { mutateAsync: removeMembersFromWorkspaceMutateAsync, isPending } =
    useMutation({
      mutationFn: removeMembersFromWorkspace,
      onSuccess: () => {
        toast({
          description: "Member is removed from the workspace successfully",
          type: "success",
        });
        queryClient.refetchQueries([`workspace-data-${id}`]);
      },
      onError: (err) => {
        toast({
          description: getErrorMessage(err),
          status: "error",
        });
      },
    });

  return { removeMembersFromWorkspaceMutateAsync, isPending };
}

export default useRemoveMemberFromWorkspace;
