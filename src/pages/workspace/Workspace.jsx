import { useParams } from "react-router-dom";

import useGetWorkspaceData from "@/hooks/apis/workspaces/useGetWorkspaceData";

import WorkSpaceLayout from "./Layout";

function Workspace() {
  const { id } = useParams();
  const { workspaceData, error } = useGetWorkspaceData(id);
  console.log(workspaceData, error);

  return <WorkSpaceLayout workspaceData={workspaceData} />;
}

export default Workspace;
