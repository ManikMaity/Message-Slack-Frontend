import { useMutation } from "@tanstack/react-query";

import { signinRequest } from "@/apis/auth";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import useAuthContext from "@/hooks/apis/context/useAuthContext";


function useSignin() {

  const { toast } = useToast();
  const {setAuth} = useAuthContext();


  const {data, mutateAsync : signinMutateAsync, isError, isLoading, isSuccess, error} = useMutation({
    mutationFn : signinRequest,
    onSuccess : (data) => {
        console.log("Signined in Successfully", data);
        setAuth({
          loading : false,
          token : data?.data?.token,
          user : data?.data?.user
        });
        localStorage.setItem("access-token", data?.data?.token);
        localStorage.setItem("user", JSON.stringify(data?.data?.user));
        toast({
            title: "Signined in Successfully",
            description: "You will be redirected to workspaces page in a few seconds",
            type: "success",
        });
    },
    onError : (error) => {
        console.log("Error while signing", error);
        toast({
            title: "Error while signing",
            description: getErrorMessage(error),
            type: "error",
        });
    }
  });


  return {
    data,
    signinMutateAsync,
    isError, 
    isLoading,
    error,
    isSuccess
  };
}

export default useSignin;
