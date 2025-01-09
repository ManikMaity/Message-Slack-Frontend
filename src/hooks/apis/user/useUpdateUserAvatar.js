import { updateUserProfile } from "@/apis/user";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation } from "@tanstack/react-query";
import useAuthContext from "../context/useAuthContext";

function useUpdateUserAvatar() {

  const {setAuth} = useAuthContext();

  const { mutateAsync: updateAvatarMutateAsync, mutate : updateAvatarMutate, isPending } = useMutation({
    mutationFn: async (image) => await updateUserProfile({ avatar: image }),
    onSuccess: (data) => {
      toast({
        title: "Avatar updated successfully",
        description: "User avatar updated successfully",
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
    updateAvatarMutateAsync,
    updateAvatarMutate,
    isPending,
  };
}

export default useUpdateUserAvatar;
