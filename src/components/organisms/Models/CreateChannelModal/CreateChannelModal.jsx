import { useState } from "react";

import Spinner from "@/components/molecules/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useCreateChannelModalContext from "@/hooks/apis/context/useCreateChannelModalContext";
import useAddChannelToWorkspace from "@/hooks/apis/workspaces/useAddChannelToWorkspace";
import useWorkspaceDataContext from "@/hooks/apis/context/useWorkspaceDataContext";

function CreateChannelModal() {
  const { createChannelModalOpen, setCreateChannelModalOpen } =
    useCreateChannelModalContext();
  const [channelName, setChannelName] = useState("");

  const {addChannelToWorkspaceMutateAsync, isPending} = useAddChannelToWorkspace();
  const {workspaceData} = useWorkspaceDataContext();

  async function handleCreateChannelSubmit(e) {
    e.preventDefault();
    if (channelName.trim() === "") {
      return;
    }
    await addChannelToWorkspaceMutateAsync({channelName, workspaceId : workspaceData?._id});
    setChannelName("");
    setCreateChannelModalOpen(false);
  }

  return (
    <Dialog
      open={createChannelModalOpen}
      onOpenChange={() => setCreateChannelModalOpen(false)}
    >
      <DialogContent className="max-w-[600px] w-[95%]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Channel</DialogTitle>
          <DialogDescription>
            Create a new channel for workspace
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateChannelSubmit} className="grid gap-4 py-4 text-sm">
          <Input required minLength={3} maxLength={50} placeholder="Channel Name e.g. team-announcements" value={channelName} onChange={(e) => setChannelName(e.target.value)}/>
          <Button disabled={isPending} type="submit">{isPending ? <Spinner /> : "Create Channel"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateChannelModal;
