import { useParams } from "react-router-dom";

import Spinner from "@/components/molecules/Spinner";
import WorkspacePanelHeader from "@/components/molecules/Workspace/WorkspacePanelHeader";
import useGetWorkspaceData from "@/hooks/apis/workspaces/useGetWorkspaceData";

import DatabaseError from "../errors/DatabaseError";
import SidebarChannelButton from "@/components/atoms/Channels/SidebarChannelButton";
import { Hash } from "lucide-react";
import WorkspaceContentPanelSec from "@/components/molecules/Workspace/WorkspaceContentPanelSec/WorkspaceContentPanelSec";

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
    <div className="flex flex-col gap-2 mt-3">
      <WorkspaceContentPanelSec label="Channels">
      {workspaceData?.channels?.map((channel) => (
        <SidebarChannelButton
          key={channel._id}
          label={channel.name}
          Icon={Hash}
          channelId={channel._id}
        />
      ))}
      </WorkspaceContentPanelSec>
      
      <SidebarChannelButton label="General" Icon={Hash} channelId="general" varient="active"/>
    </div>
  </div>;
}

export default WorkspaceContentPanel;
