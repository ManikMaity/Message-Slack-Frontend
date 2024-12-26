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
import TextEdit from "@/components/atoms/TextEdit/TextEdit";

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
  ConfirmAlert,
}) {
  return (
    <Dialog
      open={wsPreferenceModalOpen}
      onOpenChange={() => {
        setWsPreferenceModalOpen(false);
        setShowNameInput(false);
      }}
    >
      <ConfirmAlert />
      <DialogContent className="max-w-[600px] w-[95%]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Prefrences</DialogTitle>
          <DialogDescription>
            Make changes to your workspace here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm">
          <TextEdit
            label={"Workspace Name"}
            showInput={showNameInput}
            values={values?.name}
            setValues={(value) => setValues({ ...values, name: value })}
            onSubmitFn={handleWorkspaceNameChange}
            submitLoading={updateWorkspacePending}
            setShowInput={setShowNameInput}
          />
          <Button
            onClick={deleteWorkspaceFn}
            variant="error"
            className="flex justify-start py-1 px-4"
            size="lg"
          >
            <Trash />
            {deleteWorkspacePending ? (
              <Spinner />
            ) : (
              <p>Delete {values?.name}</p>
            )}
          </Button>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default WorkspacePreferenceModalContent;
