import { getUserProfile } from "@/apis/user";
import { useMutation } from "@tanstack/react-query";

function useGetUserProfile() {
  const {mutateAsync : getUserProfileMutateAsync} = useMutation({
    mutationFn: getUserProfile,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    getUserProfileMutateAsync,
  };
}

export default useGetUserProfile;
