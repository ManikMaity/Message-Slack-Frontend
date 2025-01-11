import { ThumbsUp, X } from "lucide-react";
import { useParams } from "react-router-dom";

import Spinner from "@/components/molecules/Spinner";
import { Button } from "@/components/ui/button";
import useVerifyEmail from "@/hooks/apis/user/useVerifyEmail";
import { getErrorMessage } from "@/utils/getErrorMessage";

function VerifyUserEmail() {
   const {hash} = useParams();
   const {data, isSuccess, isError, error, refetch} = useVerifyEmail(hash);  
  
    if (isSuccess) {
      return (
        <div className="min-h-40 flex mt-12 flex-col items-center justify-center gap-2 text-center">
          <ThumbsUp/>
          <p>Email Verified Successfully</p>
          <Button onClick={() => navigator(`/workspace/${data?._id}`)}>Go To Workspace</Button>
        </div>
      );
    }
  
    if (isError){
      return (
        <div className="min-h-40 flex mt-12 flex-col items-center justify-center gap-2 text-center">
          <X/>
          <p>{getErrorMessage(error)}</p>
          <Button variant="outline" onClick={refetch}>Retry</Button>
        </div>
      );
    }
  
  
    return (
      <div className="min-h-40 flex flex-col mt-12 items-center justify-center gap-2 text-center">
        <Spinner />
        <p>Verifying your email</p>
      </div>
    );
}

export default VerifyUserEmail;
