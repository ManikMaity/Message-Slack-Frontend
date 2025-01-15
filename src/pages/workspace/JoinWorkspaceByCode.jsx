import Spinner from "@/components/molecules/Spinner";
import { Button } from "@/components/ui/button";
import useJoinWorkspaceByJoinCode from "@/hooks/apis/workspaces/useJoinWorkspaceByJoinCode";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { ThumbsUp, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function JoinWorkspaceByCode() {
  const { joinCode } = useParams();

  const {data, isLoading, isSuccess, isError, error, refetch } =
    useJoinWorkspaceByJoinCode(joinCode);
  const navigator = useNavigate();



  if (isSuccess) {
    return (
      <div className="min-h-40 flex mt-12 flex-col items-center justify-center gap-2 text-center">
        <ThumbsUp/>
        <p>Joined the workspace</p>
        <Button onClick={() => navigator(`/workspace/${data?._id}/channel/${data?.channels[0]}`)}>Go To Workspace</Button>
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
      <p>Joining the workspace</p>
    </div>
  );
}

export default JoinWorkspaceByCode;
