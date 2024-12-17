import { SidebarOpen } from "lucide-react";

import WorkspaceSidebar from "@/components/organisms/workspace/WorkspaceSidebar";
import { Button } from "@/components/ui/button";
import useSidebarContext from "@/hooks/apis/context/useSidebarContext";
import WorkspaceNavbar from "@/components/organisms/workspace/WorkspaceNavbar";
import WorkspaceContentLayout from "@/components/organisms/workspace/WorkspaceContentLayout";

function WorkSpaceLayout() {
  const { mainSidebarOpen, setMainSidebarOpen } = useSidebarContext();

  return (
    <div className="h-screen w-full flex-col dark:bg-slate-900 bg-slack-dark">
      <div className="h-[6%] w-full flex items-center py-[5px] dark:bg-slate-900 bg-slack-dark">
        <WorkspaceNavbar />
      </div>
      <div className="flex h-[94%] relative">
        {!mainSidebarOpen && (
          <Button
            className="absolute bottom-1 left-1"
            size="sm"
            variant="outline"
            onClick={() => setMainSidebarOpen(true)}
          >
            <SidebarOpen />
          </Button>
        )}
        <div className={`${mainSidebarOpen ? "w-[65px] md:w-[70px]" : "w-0"}`}>
          {mainSidebarOpen && <WorkspaceSidebar />}
        </div>
        <div className="w-full">
          <WorkspaceContentLayout/>
        </div>
      </div>
    </div>
  );
}

export default WorkSpaceLayout;
