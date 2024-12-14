import { useParams } from "react-router-dom";

import useGetWorkspaceData from "@/hooks/apis/workspaces/useGetWorkspaceData";

function Workspace() {
    const  {id} = useParams();
    const {workspaceData, error} = useGetWorkspaceData(id);
    console.log(workspaceData, error);

  return (
    <div>
      Workspace page 
    </div>
  );
}

export default Workspace;
