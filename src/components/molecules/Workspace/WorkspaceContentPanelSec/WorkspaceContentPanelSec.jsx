import { Button } from "@/components/ui/button";
import useCreateChannelModalContext from "@/hooks/apis/context/useCreateChannelModalContext";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useState } from "react";

function WorkspaceContentPanelSec({ children, label, addButtonClickFn }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col gap-0.5 mt-3">
      <div className="flex items-center justify-between group">
        <div className="flex items-center gap-1">
         
          <Button
            onClick={() => setOpen(!open)}
            size="xs"
            className="py-1 px-2 text-white/50 text-[0.9rem]"
            variant="transparent"
          >
            {open ? <ChevronUp /> : <ChevronDown />}
            {label}
          </Button>
        </div>
        <Button onClick={addButtonClickFn} size="xs" className="p-1.5 hidden group-hover:block text-white/50" variant="transparent"><Plus /></Button>
      </div>
      {open && <div className="flex flex-col gap-1 ml-1">
        {children}
      </div>}
    </div>
  );
}

export default WorkspaceContentPanelSec;
