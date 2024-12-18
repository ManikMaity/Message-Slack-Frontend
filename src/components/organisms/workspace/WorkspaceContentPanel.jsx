import { useParams } from "react-router-dom";

import Spinner from "@/components/molecules/Spinner";
import WorkspacePanelHeader from "@/components/molecules/Workspace/WorkspacePanelHeader";
import useGetWorkspaceData from "@/hooks/apis/workspaces/useGetWorkspaceData";

import DatabaseError from "../errors/DatabaseError";

function WorkspaceContentPanel() {
  const { id } = useParams();
  const { workspaceData, isLoading, isError, error, refetch } =
    useGetWorkspaceData(id);
  console.log(workspaceData, "WorkspaceContentPanel");
  if (isLoading) {
    return (
      <div className="min-h-40 grid place-content-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-3">
        <DatabaseError
          styleObj={{ backgroundColor: "transparent", border: "none" }}
          message={error?.message}
          errorTitle={error?.message}
          onClickFn={refetch}
        />
      </div>
    );
  }

  return <div className="p-2 text-white">
    <WorkspacePanelHeader workspaceData={workspaceData}/>
  </div>;
}

export default WorkspaceContentPanel;
