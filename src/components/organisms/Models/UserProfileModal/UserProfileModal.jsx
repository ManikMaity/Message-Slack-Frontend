import { useEffect, useRef, useState } from "react";

import useAuthContext from "@/hooks/apis/context/useAuthContext";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";
import useSendVerifyEmail from "@/hooks/apis/user/useSendVerifyEmail";
import useUpdateUserAvatar from "@/hooks/apis/user/useUpdateUserAvatar";
import useUpdateUsername from "@/hooks/apis/user/useUpdateUsername";
import useUploadImage from "@/hooks/firebase/useUploadImage";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

import UserProfileModalContent from "./UserProfileModalContent";

function UserProfileModal() {
  const { userProfileModalOpen, setUserProfileModalOpen } =
    useModalOpenContext();
  const { auth } = useAuthContext();
  const [userData, setUserData] = useState(auth?.user);
  const [showUserNameInput, setShowUserNameInput] = useState(false);
  const { updateUsernameMutateAsync, isPending: updateUsernamePending } =
    useUpdateUsername();

  const [imageFile, setImageFile] = useState(null);
  const imageInputRef = useRef(null);
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
  const { updateAvatarMutateAsync } =
    useUpdateUserAvatar();
  const {
    sendVerifyEmailMutateAsync,
    isPending: verifyEmailSentPending,
    isSuccess: verifyEmailSentSuccess,
  } = useSendVerifyEmail();

  async function updateUsername(e) {
    e.preventDefault();
    await updateUsernameMutateAsync(userData?.username);
  }

  async function sendVerifyEmail() {
    await sendVerifyEmailMutateAsync(userData?.email);
  }

  async function updateAvatar(imageUrl) {
    const prevImage = userData?.avatar;
    await updateAvatarMutateAsync(imageUrl);
    await deleteImageFromFirebase(prevImage);
  }

  async function handleImageUpload() {
    if (!imageFile) return;
    setImageUrl(null);
    await uploadImageToFirebase(imageFile);
    imageInputRef.current.value = null;
    setImageFile(null);
  }

  useEffect(() => {
    if (imageUrl) {
      updateAvatar(imageUrl);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (imageFile) {
      handleImageUpload();
    }
  }, [imageFile]);

  useEffect(() => {
    setUserData(auth?.user);
  }, [auth]);

  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Error while uploading profile image",
        description: getErrorMessage(error),
      });
    }
  }, [isError]);


  return (
   <UserProfileModalContent
    userProfileModalOpen={userProfileModalOpen}
    setUserProfileModalOpen={setUserProfileModalOpen}
    imageInputRef={imageInputRef}
    setImageFile={setImageFile}
    isUploading={isUploading}
    loadingPercentage={loadingPercentage}
    userData={userData}
    setUserData={setUserData}
    showUserNameInput={showUserNameInput}
    setShowUserNameInput={setShowUserNameInput}
    updateUsername={updateUsername}
    updateUsernamePending={updateUsernamePending}
    sendVerifyEmail={sendVerifyEmail}
    verifyEmailSentPending={verifyEmailSentPending}
    verifyEmailSentSuccess={verifyEmailSentSuccess}
   />
  );
}

export default UserProfileModal;
