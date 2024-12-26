import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useCreateWorkspaceContext from "@/hooks/apis/context/useCreateWorkspaceContext";
import useGetUserWorkspace from "@/hooks/apis/workspaces/useGetUserWorkspace";

function Workspaces() {
  const { workspacesData, isError, isLoading } =
    useGetUserWorkspace();
  const navigate = useNavigate();
  const { setOpenCreateModal } = useCreateWorkspaceContext();

  useEffect(() => {
    if (isLoading || isError) return;
    if (workspacesData?.data?.length === 0 || !workspacesData?.data){
      console.log("No workspaces found, Creating one");
      setOpenCreateModal(true);
    }
    else {
      navigate(`/workspace/${workspacesData?.data[0]?._id}/channel/${workspacesData?.data[0]?.channels[0]}`);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspacesData, isLoading, isError]);

  return <div>Wokspaces</div>;
}

export default Workspaces;
