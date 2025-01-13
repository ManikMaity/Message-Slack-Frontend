import { ChevronDown, ListFilterIcon, SquarePen } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthContext from "@/hooks/apis/context/useAuthContext";
import useModalInitialValueContext from "@/hooks/apis/context/useModalInitialValueContext";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";
import useLeaveWorkspace from "@/hooks/apis/workspaces/useLeaveWorkspace";

function WorkspacePanelHeader({ workspaceData }) {
  const { setWsPreferenceModalOpen } = useModalOpenContext();
  const { setWorkspacePreferencesVlaue } = useModalInitialValueContext();
  const {setWorkspaceLinkModalOpen} = useModalOpenContext();
  const {leaveWorkspaceMutateAync, isPending : leaveWorkspacePending} = useLeaveWorkspace();

  async function handleLeaveWorkspace() {
    const confirm = window.confirm(
      "Are you sure you want to leave this workspace?"
    );
    if (!confirm) return;
    await leaveWorkspaceMutateAync(workspaceData?._id);
  }

  useEffect(() => {
    setWorkspacePreferencesVlaue(workspaceData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceData]);

  const { auth } = useAuthContext();
  const isAdmin = workspaceData?.members.find((member) => {
    if (member?.member?._id === auth?.user?._id && member.role === "admin") {
      return member;
    }
  });

  return (
    <div className="flex md:items-center md:flex-row flex-col justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none hover:bg-accent/80 rounded-md">
          <div>
            <div className="flex items-center py-1 px-2">
              <p className="text-sm md:text-base  font-bold">
                {workspaceData?.name}
              </p>
              <ChevronDown />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-64">
          <DropdownMenuItem>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-md bg-slate-800 relative font-bold overflow-hidden">
                <img
                  src={workspaceData?.image}
                  className="h-full w-full object-cover brightness-50"
                />
                <p className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {workspaceData?.name[0]?.toUpperCase()}
                </p>
              </div>
              <div className="leading-none">
                <p className="text-base font-semibold">{workspaceData?.name}</p>
                <p className="text-green-600">Active Workspace</p>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {isAdmin && (
            <div>
              <DropdownMenuItem onClick={() => setWorkspaceLinkModalOpen(true)}>
                Invite to {workspaceData?.name || "Workspace"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setWsPreferenceModalOpen(true)}>
                Preferences
              </DropdownMenuItem>

              <DropdownMenuSeparator />
            </div>
          )}
          <DropdownMenuItem onClick={handleLeaveWorkspace}>
            {leaveWorkspacePending ? "Leaving..." : `Leave ${workspaceData?.name}`}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex gap-2 justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none hover:bg-accent/80 rounded-md p-2">
            <ListFilterIcon className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="start"
            className="w-64"
          ></DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="transparent">
          <SquarePen className="text-white h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default WorkspacePanelHeader;
