import { useMutation } from "@tanstack/react-query";

import { signinRequest } from "@/apis/auth";


function useSignin() {
  const {data, mutate : signinMutate, isError, isLoading, isSuccess} = useMutation({
    mutationFn : signinRequest,
    onSuccess : (data) => {
        console.log("Signined in Successfully", data);
    },
    onError : (error) => {
        console.log("Error while signing", error);
    }
  });


  return {
    data,
    signinMutate,
    isError, 
    isLoading,
    isSuccess
  };
}

export default useSignin;
