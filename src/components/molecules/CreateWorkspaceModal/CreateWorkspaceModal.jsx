import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateWorkspaceContext from "@/hooks/apis/context/useCreateWorkspaceContext";
import useCreateWorkspace from "@/hooks/apis/workspaces/useCreateWorkspace";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

import Spinner from "../Spinner";

export function CreateWorkspaceModal() {
  const navigator = useNavigate();
  const { openCreateModal, setOpenCreateModal } = useCreateWorkspaceContext();
  const [workspaceData, setWorkspaceData] = useState({
    name: "",
    description: "",
  });
  const { createWorkspaceMutateAsync, isPending } = useCreateWorkspace();

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      
      const data = await createWorkspaceMutateAsync({
        ...workspaceData,
      });
      setWorkspaceData({ name: "", description: "" });
      setOpenCreateModal(false);
      console.log(data);
      navigator(`/workspace/${data?._id}/channel/${data?.channels[0]?._id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: getErrorMessage(error),
      });
    }
  }

  return (
    <Dialog
      open={openCreateModal}
      onOpenChange={() => setOpenCreateModal(false)}
    >
      <DialogContent className="w-[95%] max-w-[425px] p-4 rounded-md sm:p-6">
        <DialogHeader>
          <DialogTitle>Create a new Workspace</DialogTitle>
          <DialogDescription>
            Fill the form below to create a new workspace
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <Label htmlFor="workspace-name">Workspace Name</Label>
          <Input
            required
            minLength={3}
            id="workspace-name"
            className="mb-2 mt-1"
            value={workspaceData.name}
            onChange={(e) =>
              setWorkspaceData((p) => ({ ...p, name: e.target.value }))
            }
            placeholder="Enter workspace name"
          />

          <Label htmlFor="workspace-des">Workspace Description</Label>
          <Input
            required
            value={workspaceData.description}
            minLength={10}
            id="workspace-des"
            onChange={(e) =>
              setWorkspaceData((p) => ({ ...p, description: e.target.value }))
            }
            className="mb-2 mt-1"
            placeholder="Enter workspace description"
          />
          <Button disabled={isPending} className="w-full" type="submit">
            {isPending ? <Spinner /> : "Create Workspace"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkspaceModal;
