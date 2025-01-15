import { Hash, Plus } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SidebarChannelButton from "@/components/atoms/Channels/SidebarChannelButton";
import MemberWorkspacePannelBtn from "@/components/atoms/MemberWorkspacePannelBtn/MemberWorkspacePannelBtn";
import WorkspaceContentPanelLoader from "@/components/atoms/SkeletonLoaders/WorkspaceContentPanelLoader";
import Spinner from "@/components/molecules/Spinner";
import WorkspaceContentPanelSec from "@/components/molecules/Workspace/WorkspaceContentPanelSec/WorkspaceContentPanelSec";
import WorkspacePanelHeader from "@/components/molecules/Workspace/WorkspacePanelHeader";
import { Button } from "@/components/ui/button";
import useCreateChannelModalContext from "@/hooks/apis/context/useCreateChannelModalContext";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";
import useWorkspaceDataContext from "@/hooks/apis/context/useWorkspaceDataContext";
import useGetWorkspaceData from "@/hooks/apis/workspaces/useGetWorkspaceData";

import DatabaseError from "../errors/DatabaseError";
import { toast } from "@/hooks/use-toast";

function WorkspaceContentPanel() {
  const { id } = useParams();
  const { channelId, memberId } = useParams();
  const { workspaceData, isLoading, isError, error, refetch } =
    useGetWorkspaceData(id);
  const { setWorkspaceData } = useWorkspaceDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isError) {
      if (error?.message === "Expired auth token provided") {
        toast({
          title: "Session Expired",
          description: "Please sign in again to continue",
          variant: "destructive",
        });
        navigate("/signin");
      }
    }

    if (workspaceData) {
      setWorkspaceData(workspaceData);
    }
  }, [id, workspaceData, error, isLoading, isError]);

  const { setCreateChannelModalOpen } = useCreateChannelModalContext();
  const { setWorkspaceLinkModalOpen } = useModalOpenContext();

  function addChannelHandler() {
    setCreateChannelModalOpen(true);
  }

  function addMemberHandler() {
    setWorkspaceLinkModalOpen(true);
  }

  if (isLoading) {
    return <WorkspaceContentPanelLoader />;
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

  return (
    <div className="p-2 text-white h-full overflow-y-scroll overflow-x-hidden">
      <WorkspacePanelHeader workspaceData={workspaceData} />
      <div className="flex flex-col gap-2 mt-3">
        <WorkspaceContentPanelSec
          label="Channels"
          addButtonClickFn={addChannelHandler}
        >
          <>
            {workspaceData?.channels?.map((channel) => (
              <SidebarChannelButton
                key={channel._id}
                label={channel.name}
                Icon={Hash}
                channelId={channel._id}
                varient={channelId === channel._id ? "active" : "default"}
              />
            ))}
            <Button
              size="xs"
              onClick={addChannelHandler}
              className="justify-start px-2 py-1 text-white/50"
              variant="transparent"
            >
              <p className="p-0.5 rounded-sm bg-accent">
                <Plus className="text-gray-400" />
              </p>
              <span>Create Channel</span>
            </Button>
          </>
        </WorkspaceContentPanelSec>

        <WorkspaceContentPanelSec
          label={"Members"}
          addButtonClickFn={addMemberHandler}
        >
          {workspaceData?.members?.map((member) => (
            <MemberWorkspacePannelBtn
              key={member._id}
              name={member?.member?.username}
              memberId={member?._id}
              userId={member?.member?._id}
              image={member?.member?.avatar}
              role={member?.role}
              variant={memberId === member?.member?._id ? "active" : "default"}
            />
          ))}
          <Button
            size="xs"
            className="justify-start px-2 py-1 text-white/50"
            variant="transparent"
            onClick={addMemberHandler}
          >
            <p className="p-0.5 rounded-sm bg-accent">
              <Plus className="text-gray-400" />
            </p>
            <span>Add Member</span>
          </Button>
        </WorkspaceContentPanelSec>
      </div>
    </div>
  );
}

export default WorkspaceContentPanel;
