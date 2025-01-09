import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";
import useAuthContext from "@/hooks/apis/context/useAuthContext";
import { useEffect, useRef, useState } from "react";
import TextEdit from "@/components/atoms/TextEdit/TextEdit";
import { BadgeCheck, Edit2, Mail } from "lucide-react";
import useUpdateUsername from "@/hooks/apis/user/useUpdateUsername";
import useUploadImage from "@/hooks/firebase/useUploadImage";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import useUpdateUserAvatar from "@/hooks/apis/user/useUpdateUserAvatar";

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
    isDeletingImage,
  } = useUploadImage();
  const { updateAvatarMutateAsync, isPending: updateAvatarPending } =
    useUpdateUserAvatar();

  async function updateUsername(e) {
    e.preventDefault();
    await updateUsernameMutateAsync(userData?.username);
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
      console.log("%crendered", "color: red");
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

  useEffect(() => {
    if (imageFile) {
      console.log("image file", imageFile);
    }
  }, [imageFile]);

  console.log("user data", userData);

  return (
    <Dialog
      open={userProfileModalOpen}
      onOpenChange={() => {
        setUserProfileModalOpen(false);
      }}
    >
      <DialogContent className="max-w-[600px] w-[95%]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imageInputRef}
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <div className="w-20 h-20 rounded-full relative overflow-hidden border-2 mx-auto bg-slate-800">
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
              src={userData?.avatar}
              alt="avatar"
              className="size-full z-0"
            />
          </div>

          <TextEdit
            showInput={showUserNameInput}
            setShowInput={setShowUserNameInput}
            onSubmitFn={updateUsername}
            values={userData?.username}
            setValues={(v) => setUserData({ ...userData, username: v })}
            submitLoading={updateUsernamePending}
            label={"Username"}
          />
          <div className="py-3 px-4 border flex items-center gap-2 border-input rounded-md leading-none">
            <Mail />
            <p>{userData?.email}</p>
          </div>
          {!userData?.isVerified ? (
            <Button variant="outline">
              <Mail />
              <p>Verify Your Email</p>
            </Button>
          ) : (
            <p className="text-green-500 mx-auto flex items-center justify-center gap-2 mt-2">
              <BadgeCheck />
              Verified User
            </p>
          )}
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UserProfileModal;
