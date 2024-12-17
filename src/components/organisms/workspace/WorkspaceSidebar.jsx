import {
  Bell,
  Home,
  MessageSquare,
  MoreHorizontal,
  SidebarClose,
} from "lucide-react";

import AddWorkspaceIconBtn from "@/components/atoms/AddWorkspaceIconBtn";
import AvatarMenu from "@/components/atoms/AvatarMenu";
import ChangeWorkspaceBtn from "@/components/molecules/SidebarButton/ChangeWorkspaceBtn";
import SidebarButton from "@/components/molecules/SidebarButton/SidebarButton";
import { Button } from "@/components/ui/button";
import useSidebarContext from "@/hooks/apis/context/useSidebarContext";

function WorkspaceSidebar() {

  const { setMainSidebarOpen } = useSidebarContext();

  return (
    <aside className="w-full h-full text-sm dark:bg-slate-900 bg-slack-dark flex flex-col justify-between items-center p-2 pt-[10px]">
      <div className="flex flex-col gap-y-4 ">
        <ChangeWorkspaceBtn/>
        <SidebarButton IconEle={Home} label="Home" />
        <SidebarButton IconEle={MessageSquare} label="DMS" />
        <SidebarButton IconEle={Bell} label="Activity" />
        <SidebarButton IconEle={MoreHorizontal} label="More" />
      </div>

      <div className="flex flex-col gap-y-4 pb-[5px]">
        <AddWorkspaceIconBtn />
        <AvatarMenu />
        <Button
          size="sm"
          variant="outline"
          onClick={() => setMainSidebarOpen(false)}
        >
          <SidebarClose />
        </Button>
      </div>
    </aside>
  );
}

export default WorkspaceSidebar;
