import { useMutation } from "@tanstack/react-query";

import { changeWorkspaceJoinCode } from "@/apis/workspace";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import useWorkspaceDataContext from "../context/useWorkspaceDataContext";

function useChangeWorkspaceJoinCode() {

  const {setWorkspaceData} = useWorkspaceDataContext();
    
  const {mutateAsync : changeJoinCodeMutateAsync, isPending} = useMutation({
    mutationFn: changeWorkspaceJoinCode,
    onSuccess: (data) => {
      toast({
        title: "Workspace join code changed successfully",
        status: "success",
      });
      setWorkspaceData(data);
    },
    onError: (err) => {
      toast({
        title: "Error changing workspace join code",
        description: getErrorMessage(err),
        status: "error",
      });
    },
  });

  return { changeJoinCodeMutateAsync, isPending };
}

export default useChangeWorkspaceJoinCode;
