import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

import Spinner from "@/components/molecules/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDeleteChannel from "@/hooks/apis/channel/useDeleteChannel";
import useUpdateChannelName from "@/hooks/apis/channel/useUpdateChannel";
import useConfirm from "@/hooks/useConfirm";

import TextEdit from "../TextEdit/TextEdit";
import CustomTooltip from "../Tooltip/CustomTooltip";

function ChannelHeader({ name = "Hi theere", id }) {
  const [channelName, setChannelName] = useState(name);
  const [showNameInput, setShowNameInput] = useState(false);
  const { isPending: deleteChannelPending, deleteChannelMutateAsync } =
    useDeleteChannel();
  const { updateChannelNameAsync, isPending: updateChannelNamePending } =
    useUpdateChannelName();
  const { confirm, ConfirmAltert } = useConfirm({
    title: "Are you sure you want to delete this channel?",
    description:
      "This action cannot be undone. Are you sure you want to continue?",
  });

  const deleteChannelFn = async () => {
    const ok = await confirm();
    if (!ok) return;
    await deleteChannelMutateAsync(id);
  };

  async function handleUpdateChannelName(e) {
    e.preventDefault();
    if (channelName.trim() === "" && channelName.trim() === name) return;
    await updateChannelNameAsync({ id, data: { name: channelName } });
  }

  useEffect(() => {
    setChannelName(name);
  }, [name]);

  return (
    <div className="h-[50px] w-full flex items-center py-[5px] border-b border-gray-300 dark:border-slate-700">
      <Dialog>
        <ConfirmAltert />
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
            <DialogDescription>This is the channel info.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-sm">
            <TextEdit
              label={"Channel Name"}
              showInput={showNameInput}
              values={channelName}
              setValues={setChannelName}
              onSubmitFn={handleUpdateChannelName}
              submitLoading={updateChannelNamePending}
              setShowInput={setShowNameInput}
            />
            <Button
              onClick={deleteChannelFn}
              variant="error"
              className="flex justify-start py-1 px-4"
              size="lg"
            >
              {deleteChannelPending ? (
                <div className="grid place-content-center w-full">
                  <Spinner />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Trash/>
                  <p>Delete &quot;{name}&quot; Channel</p>
                </div>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChannelHeader;
