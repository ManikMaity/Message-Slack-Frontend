import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CustomTooltip from "../Tooltip/CustomTooltip";
import TextEdit from "../TextEdit/TextEdit";
import { useState } from "react";

function ChannelHeader({ name = "Hi theere" }) {

    const [channelName, setChannelName] = useState(name);
    const [showNameInput, setShowNameInput] = useState(false);



  return (
    <div className="h-[50px] w-full flex items-center py-[5px] border-b border-gray-300 dark:border-slate-700">
      <Dialog>
        <DialogTrigger>
          <CustomTooltip side="bottom" content={"Get Chennel Info"}>
            <Button variant="ghost" className="text-xl ml-2">
              # {channelName}
            </Button>
          </CustomTooltip>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Channel Info</DialogTitle>
            <DialogDescription>
                This is the channel info.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-sm">
            <TextEdit
                label={"Channel Name"}
                showInput={showNameInput}
                values={channelName}
                setValues={setChannelName}
                onSubmitFn={() => {}}
                submitLoading={false}
                setShowInput={setShowNameInput}
            />
            <Button variant="error" className="flex justify-start py-1 px-4" size="lg">
                Delete &quot;{name}&quot; Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChannelHeader;
