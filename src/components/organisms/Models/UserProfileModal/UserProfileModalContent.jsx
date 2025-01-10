  import { BadgeCheck, Edit2, Mail } from "lucide-react";

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
 

function UserProfileModalContent({
  userProfileModalOpen,
  setUserProfileModalOpen,
  imageInputRef,
  setImageFile,
  isUploading,
  loadingPercentage,
  userData,
  setUserData,
  showUserNameInput,
  setShowUserNameInput,
  updateUsername,
  updateUsernamePending,
  sendVerifyEmail,
  verifyEmailSentPending,
  verifyEmailSentSuccess,
}) {
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
          <Button variant="outline" onClick={sendVerifyEmail}>
            {!verifyEmailSentPending ? <div className="flex items-center gap-2">
              <Mail />
              {verifyEmailSentSuccess ? <p>Email Sent</p> : <p>Verify Your Email</p>}
            </div> : <Spinner/>}
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

export default UserProfileModalContent;
