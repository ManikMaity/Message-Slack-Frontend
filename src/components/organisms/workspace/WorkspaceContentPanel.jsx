import { useParams } from "react-router-dom";

import Spinner from "@/components/molecules/Spinner";
import WorkspacePanelHeader from "@/components/molecules/Workspace/WorkspacePanelHeader";
import useGetWorkspaceData from "@/hooks/apis/workspaces/useGetWorkspaceData";

import DatabaseError from "../errors/DatabaseError";
import SidebarChannelButton from "@/components/atoms/Channels/SidebarChannelButton";
import { Hash, Plus } from "lucide-react";
import WorkspaceContentPanelSec from "@/components/molecules/Workspace/WorkspaceContentPanelSec/WorkspaceContentPanelSec";
import { Button } from "@/components/ui/button";
import useCreateChannelModalContext from "@/hooks/apis/context/useCreateChannelModalContext";
import MemberWorkspacePannelBtn from "@/components/atoms/MemberWorkspacePannelBtn/MemberWorkspacePannelBtn";

function WorkspaceContentPanel() {
  const { id } = useParams();
  const { workspaceData, isLoading, isError, error, refetch } =
    useGetWorkspaceData(id);
    console.log(workspaceData);
    const {setCreateChannelModalOpen} = useCreateChannelModalContext();

    function addChannelHandler() {
      setCreateChannelModalOpen(true);
    }

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
      <WorkspaceContentPanelSec label="Channels" addButtonClickFn={addChannelHandler}>
        <>
      {workspaceData?.channels?.map((channel) => (
        <SidebarChannelButton
          key={channel._id}
          label={channel.name}
          Icon={Hash}
          channelId={channel._id}
        />        
      ))}
       <Button size="xs" onClick={addChannelHandler} className="justify-start px-2 py-1 text-white/50" variant="transparent">
          <p className="p-0.5 rounded-sm bg-accent"><Plus /></p>
          <span>Create Channel</span>
        </Button>
      </>
      </WorkspaceContentPanelSec>

      <WorkspaceContentPanelSec label={"Members"} >
        {workspaceData?.members?.map((member) => (
          <MemberWorkspacePannelBtn
            key={member._id}
            name={member?.member?.username}
            memberId={member?._id}
            image={member?.member?.avatar}
            role={member?.role}
          />
        ))}
      </WorkspaceContentPanelSec>
      
    </div>
  </div>;
}

export default WorkspaceContentPanel;
