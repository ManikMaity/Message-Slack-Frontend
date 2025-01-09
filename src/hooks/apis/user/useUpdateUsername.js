import { updateUserProfile } from "@/apis/user";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation } from "@tanstack/react-query";
import useAuthContext from "../context/useAuthContext";

function useUpdateUsername() {

  const {setAuth} = useAuthContext();

  const { mutateAsync: updateUsernameMutateAsync, isPending } = useMutation({
    mutationFn: async (username) => await updateUserProfile({ username }),
    onSuccess: (data) => {
      toast({
        title: "Username updated successfully",
        description:
          "You will be redirected to workspaces page in a few seconds",
        type: "success",
      });
      setAuth(prev => ({...prev, user : data}));
      localStorage.setItem("user", JSON.stringify(data));
    },
    onError: (error) => {
      toast({
        title: "Error while updating username",
        description: getErrorMessage(error),
        status: "error",
      });
    },
  });

  return {
    updateUsernameMutateAsync,
    isPending,
  };
}

export default useUpdateUsername;
