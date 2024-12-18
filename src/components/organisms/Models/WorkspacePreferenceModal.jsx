import { EditIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useModalInitialValueContext from "@/hooks/apis/context/useModalInitialValueContext";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";
import useDeleteWorkspace from "@/hooks/apis/workspaces/useDeleteWorkspace";

function WorkspacePreferenceModal() {
  const { workspacePreferencesVlaue } = useModalInitialValueContext();
  const [values, setValues] = useState(workspacePreferencesVlaue);
  const { wsPreferenceModalOpen, setWsPreferenceModalOpen } =
    useModalOpenContext();
  const {deleteWorkspaceMutateAsync, isSuccess, isPending, isError, error} = useDeleteWorkspace();

  useEffect(() => {
    setValues(workspacePreferencesVlaue);
  }, [workspacePreferencesVlaue]);

  const deleteWorkspace = async () => {
    if (!confirm("Are you sure you want to delete this workspace?")) {
      return;  
    }
    await deleteWorkspaceMutateAsync(values?._id);
    setWsPreferenceModalOpen(false);
  };

  return (
    <Dialog
      open={wsPreferenceModalOpen}
      onOpenChange={() => setWsPreferenceModalOpen(false)}
    >
      <DialogContent className="max-w-[600px] w-[95%]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Prefrences</DialogTitle>
          <DialogDescription>
            Make changes to your workspace here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm">
          <div className="py-3 px-4 border border-input rounded-md leading-none">
            <div className="flex justify-between ">
              <p className="font-bold">Workspace Name</p>
              <Button size="xs" className="p-1" variant="outline">
                <EditIcon />
              </Button>
            </div>
            <p>{values?.name}</p>
          </div>
          <Button
            onClick={deleteWorkspace}
            variant="error"
            className="flex justify-start py-1 px-4"
            size="lg"
          >
            <Trash />
            <p>Delete {values?.name}</p>
          </Button>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default WorkspacePreferenceModal;
