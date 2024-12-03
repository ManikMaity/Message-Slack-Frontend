import { useMutation } from "@tanstack/react-query";

import { signupRequest } from "@/apis/auth";

function useSignup() {
    const { mutateAsync : signupMutateAsync, isLoading, error, data, isSuccess } = useMutation({
        mutationFn: signupRequest,
        onSuccess: (data) => {
            console.log("Successfully signed up", data);
        },
        onError: (error) => {
            console.log("Error signing up", error);
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
