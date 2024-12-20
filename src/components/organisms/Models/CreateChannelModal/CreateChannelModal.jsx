import Spinner from "@/components/molecules/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useCreateChannelModalContext from "@/hooks/apis/context/useCreateChannelModalContext";
import { useState } from "react";

function CreateChannelModal() {
  const { createChannelModalOpen, setCreateChannelModalOpen } =
    useCreateChannelModalContext();
  const [channelName, setChannelName] = useState("");

  function handleCreateChannelSubmit(e) {
    e.preventDefault();
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
          <Input placeholder="Channel Name e.g. team-announcements" value={channelName} onChange={(e) => setChannelName(e.target.value)}/>
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateChannelModal;
