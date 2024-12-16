import {SidebarOpen } from "lucide-react";

import WorkspaceSidebar from "@/components/organisms/workspace/WorkspaceSidebar";
import { Button } from "@/components/ui/button";
import useSidebarContext from "@/hooks/apis/context/useSidebarContext";

function WorkSpaceLayout({ workspaceData }) {

  const {mainSidebarOpen, setMainSidebarOpen} = useSidebarContext();
  console.log(mainSidebarOpen, "Layout");

  return (
    <div className="h-screen w-full flex-col">
      <div className="flex h-full relative">
        {!mainSidebarOpen && <Button className="absolute bottom-1 left-1" size="sm" variant="outline" onClick={() => setMainSidebarOpen(true)}><SidebarOpen/></Button>}
        <div className="w-[65px] md:w-[70px]">
        {mainSidebarOpen && <WorkspaceSidebar workspaceData={workspaceData}/>}
        </div>
      </div>
    </div>
  );
}

export default WorkSpaceLayout;
