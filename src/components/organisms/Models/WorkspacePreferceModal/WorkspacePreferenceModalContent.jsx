import { Edit2, Trash, } from "lucide-react";

import TextEdit from "@/components/atoms/TextEdit/TextEdit";
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
import { Progress } from "@/components/ui/progress";


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
  imageInputRef,
  setImageFile,
  isUploading,
  loadingPercentage,
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
        <div className="w-20 h-20 rounded-full relative overflow-hidden border-2 mx-auto bg-slate-800">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={imageInputRef}
          onChange={(e) => setImageFile(e.target.files[0])}
        />
          <button
             disabled={isUploading}
             onClick={() => imageInputRef.current.click()}
             className={`bg-black/50 h-full ${
               isUploading ? "cursor-not-allowed hidden" : ""
             } opacity-0 hover:opacity-100 cursor-pointer transition-all grid place-content-center rounded-full absolute z-10 w-full top-0 left-0`}
          >
            <Edit2 />
          </button>
          {isUploading && (
            <div className="absolute size-full top-0 left-0 flex items-center justify-center bg-black/90 rounded-full">
              <Progress value={loadingPercentage} className="w-[90%]" />
            </div>
          )}
          <img
            src={values?.image || "https://via.placeholder.com/150"}
            alt="avatar"
            className="size-full z-0"
          />
        </div>

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
