import { useParams } from "react-router-dom";

import useGetWorkspaceData from "@/hooks/apis/workspaces/useGetWorkspaceData";

import WorkSpaceLayout from "./Layout";

function Workspace() {
  const { id } = useParams();

  return <WorkSpaceLayout/>;
}

export default Workspace;
