import { useEffect, useState } from "react";

import useModalInitialValueContext from "@/hooks/apis/context/useModalInitialValueContext";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";
import useDeleteWorkspace from "@/hooks/apis/workspaces/useDeleteWorkspace";
import useUpdateWorkspace from "@/hooks/apis/workspaces/useUpdateWorkspace";

import WorkspacePreferenceModalContent from "./WorkspacePreferenceModalContent";
import useConfirm from "@/hooks/useConfirm";

function WorkspacePreferenceModal() {
  const { workspacePreferencesVlaue } = useModalInitialValueContext();
  const [values, setValues] = useState(workspacePreferencesVlaue);
  const {confirm, ConfirmAltert} = useConfirm({title : "Are you sure you want to delete this workspace?", description: "This action cannot be undone. Are you sure you want to continue?"});

  const { wsPreferenceModalOpen, setWsPreferenceModalOpen } =
  useModalOpenContext();
  const [showNameInput, setShowNameInput] = useState(false);

  const { deleteWorkspaceMutateAsync, isPending } = useDeleteWorkspace();
  const {updateWorkspaceMutateAsync, isPending : updateWorkspacePending} = useUpdateWorkspace();


  useEffect(() => {
    setValues(workspacePreferencesVlaue);
  }, [workspacePreferencesVlaue]);

  const deleteWorkspace = async () => {
    const ok = await confirm();
    if (!ok) return;
    await deleteWorkspaceMutateAsync(values?._id);
    setWsPreferenceModalOpen(false);
  };

  async function handleWorkspaceNameChange(e) {
    e.preventDefault();
    if (values?.name === workspacePreferencesVlaue?.name) {
      setShowNameInput(false);
      return;
    }
    const resposne = await updateWorkspaceMutateAsync({id : values?._id, data : {name : values?.name || workspacePreferencesVlaue?.name}});
    setShowNameInput(false);
  }

  return (
    <WorkspacePreferenceModalContent
      wsPreferenceModalOpen={wsPreferenceModalOpen}
      setWsPreferenceModalOpen={setWsPreferenceModalOpen}
      setShowNameInput={setShowNameInput}
      showNameInput={showNameInput}
      values={values}
      setValues={setValues}
      deleteWorkspaceFn={deleteWorkspace}
      deleteWorkspacePending={isPending}
      handleWorkspaceNameChange={handleWorkspaceNameChange}
      updateWorkspacePending={updateWorkspacePending}
      ConfirmAlert={ConfirmAltert}
    />
  );
}

export default WorkspacePreferenceModal;
