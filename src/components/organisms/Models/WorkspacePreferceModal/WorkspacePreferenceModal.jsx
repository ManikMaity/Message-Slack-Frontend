import { useEffect, useRef, useState } from "react";

import useModalInitialValueContext from "@/hooks/apis/context/useModalInitialValueContext";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";
import useDeleteWorkspace from "@/hooks/apis/workspaces/useDeleteWorkspace";
import useUpdateWorkspace from "@/hooks/apis/workspaces/useUpdateWorkspace";
import useUploadImage from "@/hooks/firebase/useUploadImage";
import { toast } from "@/hooks/use-toast";
import useConfirm from "@/hooks/useConfirm";
import { getErrorMessage } from "@/utils/getErrorMessage";

import WorkspacePreferenceModalContent from "./WorkspacePreferenceModalContent";

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


  const imageInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const {
    imageUrl,
    loadingPercentage,
    error,
    isUploading,
    isError,
    setImageUrl,
    uploadImageToFirebase,
    deleteImageFromFirebase,
  } = useUploadImage();


  useEffect(() => {
    if (imageFile) {
      console.log("%crendered", "color: red");
      handleImageUpload();
    }
  }, [imageFile]);


  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Error while uploading profile image",
        description: getErrorMessage(error),
      });
    }
  }, [isError]);

  useEffect(() => {
    if (imageFile) {
      console.log("image file", imageFile);
    }
  }, [imageFile]);

  async function handleImageUpload() {
    if (!imageFile) return;
    setImageUrl(null);
    await uploadImageToFirebase(imageFile);
    imageInputRef.current.value = null;
    setImageFile(null);
  }

  async function handleUpdateWorkspaceImage() {
    const prevImage = values?.image;
    await updateWorkspaceMutateAsync({id : values?._id, data : {image : imageUrl}});
    await deleteImageFromFirebase(prevImage);
  }


  useEffect(() => {
    if (imageUrl) {
      handleUpdateWorkspaceImage();
    }
  }, [imageUrl]);

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
      imageInputRef={imageInputRef}
      setImageFile={setImageFile}
      isUploading={isUploading}
      loadingPercentage={loadingPercentage}
    />
  );
}

export default WorkspacePreferenceModal;
