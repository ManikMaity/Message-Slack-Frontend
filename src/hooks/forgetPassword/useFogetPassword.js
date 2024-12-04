import { useMutation } from "@tanstack/react-query";

import { forgetPasswordRequest } from "@/apis/forgetPassword";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { toast } from "../use-toast";

function useFogetPassword() {
  const { isSuccess, isError, error, isPending, mutateAsync : forgetPasswordMutateAsync } = useMutation({
    mutationFn: forgetPasswordRequest,
    onSuccess: (data) => {
      console.log("Successfully sent reset password link to email", data);
      toast({
        title : "Successfully sent reset password link to email",
        description : "Check your email to reset your password",
        type : "success",
      });
    },
    onError: (error) => {
      console.log("Error while sending reset password link to email", error);
      toast({
        title : "Error while sending reset password link to email",
        description : getErrorMessage(error),
        type : "error",
      });
    },
  });

  return { isSuccess, isError, error, isPending, forgetPasswordMutateAsync };
}

export default useFogetPassword;
