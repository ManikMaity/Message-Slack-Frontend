import { Button } from "@/components/ui/button";
import useCreateChannelModalContext from "@/hooks/apis/context/useCreateChannelModalContext";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useState } from "react";

function WorkspaceContentPanelSec({ children, label }) {
  const [open, setOpen] = useState(true);
  const {setCreateChannelModalOpen} = useCreateChannelModalContext();

  return (
    <div className="flex flex-col gap-0.5 px-2 mt-3">
      <div className="flex items-center justify-between group">
        <div className="flex items-center gap-1">
         
          <Button
            onClick={() => setOpen(!open)}
            size="xs"
            className="py-1 px-3 text-white/50 text-[0.9rem]"
            variant="transparent"
          >
            {open ? <ChevronUp /> : <ChevronDown />}
            {label}
          </Button>
        </div>
        <Button onClick={() => setCreateChannelModalOpen(true)} size="xs" className="p-1.5 hidden group-hover:block text-white/50" variant="transparent"><Plus /></Button>
      </div>
      {open && <div className="flex flex-col gap-2">
        {children}
        <Button size="xs" onClick={() => setCreateChannelModalOpen(true)} className="justify-start px-2 py-1 text-white/50" variant="transparent">
          <p className="p-0.5 rounded-sm bg-accent"><Plus /></p>
          <span>Create Channel</span>
        </Button>
      </div>}
    </div>
  );
}

export default WorkspaceContentPanelSec;
