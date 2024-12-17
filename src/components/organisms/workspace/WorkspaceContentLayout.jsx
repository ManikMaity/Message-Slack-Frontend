import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function WorkspaceContentLayout() {
  return (
    <ResizablePanelGroup direction="horizontal" className="border border-slack/80 dark:border-slate-800/80 rounded-tl-md overflow-hidden" autoSaveId={"workspace-content"}>
      <ResizablePanel defaultSize={20} className="bg-slack-dark600 dark:bg-slate-950">
        Channels
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="dark:bg-slate-800 bg-gray-50">
        Content
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default WorkspaceContentLayout;
