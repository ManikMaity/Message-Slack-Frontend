import { useMutation } from "@tanstack/react-query";

import { signupRequest } from "@/apis/auth";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

function useSignup() {

    const { toast } = useToast();

    
    const { mutateAsync : signupMutateAsync, isLoading, error, data, isSuccess } = useMutation({
        mutationFn: signupRequest,
        onSuccess: (data) => {
            console.log("Successfully signed up", data);
            toast({
                title: "Successfully signed up",
                description: "You will be redirected to signin page in a few seconds",
                type: "success",
            });
        },
        onError: (error) => {
            console.log("Error signing up", error);
            toast({
                title: "Error signing up",
                description: getErrorMessage(error),
                type: "error",
            });
        },
    });


    return {
        signupMutateAsync,
        isLoading,
        error,
        data,
        isSuccess
    };
}

export default useSignup;
