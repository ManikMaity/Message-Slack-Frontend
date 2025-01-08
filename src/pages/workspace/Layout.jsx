import { SidebarOpen } from "lucide-react";

import WorkspaceContentPanel from "@/components/organisms/workspace/WorkspaceContentPanel";
import WorkspaceNavbar from "@/components/organisms/workspace/WorkspaceNavbar";
import WorkspaceSidebar from "@/components/organisms/workspace/WorkspaceSidebar";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useSidebarContext from "@/hooks/apis/context/useSidebarContext";

function WorkSpaceLayout({ children }) {
  const { mainSidebarOpen, setMainSidebarOpen } = useSidebarContext();

  return (
    <div className="h-screen w-full overflow-hidden flex-col dark:bg-slate-900 bg-slack-dark">
      <div className="h-[6%] w-full flex items-center py-[5px] dark:bg-slate-900 bg-slack-dark">
        <WorkspaceNavbar />
      </div>
      <div className="flex h-[94%] relative">
        {!mainSidebarOpen && (
          <Button
            className="absolute bottom-40 left-1 z-20"
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
        <div className={`${mainSidebarOpen ? "w-[calc(100%-65px)] md:w-[calc(100%-70px)]" : "w-full"}`}>
        <ResizablePanelGroup direction="horizontal" className="border border-slack/80 dark:border-slate-800/80 rounded-tl-md overflow-hidden" autoSaveId={"workspace-content"}>
      <ResizablePanel defaultSize={20} className="bg-slack-dark600 dark:bg-slate-950">
        <WorkspaceContentPanel/>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="bg-gray-100 dark:bg-slate-900">
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}

export default WorkSpaceLayout;
