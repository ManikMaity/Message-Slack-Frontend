import useWorkspaceIdContext from "@/hooks/apis/context/useWorkspaceIdContext";
import WorkSpaceLayout from "./Layout";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Workspace() {
  const { setWorkspaceId } = useWorkspaceIdContext();
  const { id } = useParams();

  useEffect(() => {
    setWorkspaceId(id);
  });

  return <WorkSpaceLayout />;
}

export default Workspace;
