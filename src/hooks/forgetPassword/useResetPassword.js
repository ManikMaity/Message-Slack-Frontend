import { useMutation } from "@tanstack/react-query";

import { resetPasswordRequest } from "@/apis/forgetPassword";

import { toast } from "../use-toast";

function useResetPassword() {
  const {isError, error, isPending, isSuccess, data, mutateAsync : resetPasswordMutateAsync} = useMutation({
    mutationFn: resetPasswordRequest,
    onSuccess: (data) => {
      toast({
        title: "Password reset is successfull",
        description: "Please signin using password",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error while reseting your password",
        description: "Password reset in unsuccessfull, try again.",
        type: "error",
      });
    },
  });

  return {
    isError,
    error,
    isPending,
    isSuccess,
    data,
    resetPasswordMutateAsync
  };
}

export default useResetPassword;
