import { useEffect, useState } from "react";

import useModalInitialValueContext from "@/hooks/apis/context/useModalInitialValueContext";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";
import useDeleteWorkspace from "@/hooks/apis/workspaces/useDeleteWorkspace";

import WorkspacePreferenceModalContent from "./WorkspacePreferenceModalContent";
import useUpdateWorkspace from "@/hooks/apis/workspaces/useUpdateWorkspace";

function WorkspacePreferenceModal() {
  const { workspacePreferencesVlaue } = useModalInitialValueContext();
  const [values, setValues] = useState(workspacePreferencesVlaue);

  const { wsPreferenceModalOpen, setWsPreferenceModalOpen } =
  useModalOpenContext();
  const [showNameInput, setShowNameInput] = useState(false);

  const { deleteWorkspaceMutateAsync, isPending } = useDeleteWorkspace();
  const {updateWorkspaceMutateAsync, isPending : updateWorkspacePending} = useUpdateWorkspace();


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

  async function handleWorkspaceNameChange(e) {
    e.preventDefault();
    const resposne = await updateWorkspaceMutateAsync({id : values?._id, data : {name : values?.name || workspacePreferencesVlaue?.name}});
    console.log(resposne, "update workspace name response");
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
    />
  );
}

export default WorkspacePreferenceModal;
