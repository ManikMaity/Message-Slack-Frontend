import { sendVerifyEmail } from "@/apis/user";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation } from "@tanstack/react-query";

function useSendVerifyEmail() {
  const { mutateAsync: sendVerifyEmailMutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: sendVerifyEmail,
    onSuccess: () => {
      toast({
        title: "Email sent successfully",
        description: "Check your email to verify your account",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error while sending email",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });

  return {
    sendVerifyEmailMutateAsync,
    isPending,
    isSuccess
  };
}

export default useSendVerifyEmail;
