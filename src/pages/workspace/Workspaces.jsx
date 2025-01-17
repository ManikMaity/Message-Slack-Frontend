import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useCreateWorkspaceContext from "@/hooks/apis/context/useCreateWorkspaceContext";
import useGetUserWorkspace from "@/hooks/apis/workspaces/useGetUserWorkspace";
import JumpLoader from "@/components/atoms/Loader/JumpLoader";

function Workspaces() {
  const { workspacesData, isError, isLoading } =
    useGetUserWorkspace();
  const navigate = useNavigate();
  const { setOpenCreateModal } = useCreateWorkspaceContext();

  useEffect(() => {
    if (isLoading || isError) return;
    if (workspacesData?.data?.length === 0 || !workspacesData?.data){
      setOpenCreateModal(true);
    }
    else {
      navigate(`/workspace/${workspacesData?.data[0]?._id}/channel/${workspacesData?.data[0]?.channels[0]}`);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspacesData, isLoading, isError]);

  return <div className="h-screen w-screen grid place-content-center">
    <JumpLoader/>
  </div>;
}

export default Workspaces;
