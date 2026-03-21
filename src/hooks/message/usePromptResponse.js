import { createAIMessageApi } from "@/apis/message";
import { toast } from "../use-toast";
import { useMutation } from "@tanstack/react-query";

function usePromptResponse() {
  const {
    isSuccess,
    isError,
    error,
    isPending,
    mutateAsync: createAIMessageMutateAsync,
  } = useMutation({
    mutationFn: createAIMessageApi,
    onError: (error) => {
      toast({
        title: "Error while creating prompt response",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });

  return {
    isSuccess,
    isError,
    error,
    isPending,
    createAIMessageMutateAsync,
  };
}

export default usePromptResponse;
