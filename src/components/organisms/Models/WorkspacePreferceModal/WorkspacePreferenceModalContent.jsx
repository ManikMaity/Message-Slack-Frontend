import { EditIcon, Trash, X } from "lucide-react";

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

function WorkspacePreferenceModalContent({
  wsPreferenceModalOpen,
  setWsPreferenceModalOpen,
  values,
  setValues,
  showNameInput,
  setShowNameInput,
  deleteWorkspaceFn,
  deleteWorkspacePending,
  handleWorkspaceNameChange,
  updateWorkspacePending,
  ConfirmAlert
}) {
  return (
    <Dialog
      open={wsPreferenceModalOpen}
      onOpenChange={() => {
        setWsPreferenceModalOpen(false);
        setShowNameInput(false);
      }}
    >
      <ConfirmAlert/>
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
              <Button
                size="xs"
                onClick={() => setShowNameInput(!showNameInput)}
                className="p-1"
                variant="outline"
              >
                {showNameInput? <X/> : <EditIcon />}
              </Button>
            </div>
            {showNameInput ? (
              <form onSubmit={handleWorkspaceNameChange} className="flex gap-2 mt-2">
                <Input
                  size="sm"
                  type="text"
                  required
                  placeholder="Workspace Name"
                  minLength={3}
                  maxLength={50}
                  autoFocus
                  defaultValue={values?.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                />
                <Button disabled={updateWorkspacePending} type="submit">{updateWorkspacePending ? <Spinner /> : "Save"}</Button>
              </form>
            ) : (
              <p>{values?.name}</p>
            )}
          </div>
          <Button
            onClick={deleteWorkspaceFn}
            variant="error"
            className="flex justify-start py-1 px-4"
            size="lg"
          >
            <Trash />
            {deleteWorkspacePending ? <Spinner /> : <p>Delete {values?.name}</p>}
          </Button>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default WorkspacePreferenceModalContent;
