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
import { useEffect, useState } from "react";
import TextEdit from "@/components/atoms/TextEdit/TextEdit";
import { BadgeCheck, Mail } from "lucide-react";

function UserProfileModal() {
  const { userProfileModalOpen, setUserProfileModalOpen } =
    useModalOpenContext();
  const { auth } = useAuthContext();
  const [userData, setUserData] = useState(auth?.user);
  const [showUserNameInput, setShowUserNameInput] = useState(false);

  useEffect(() => {
    setUserData(auth?.user);
  }, [auth]);

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
          <img
            src={userData?.avatar}
            alt="avatar"
            className="w-20 h-20 rounded-full border-2 mx-auto"
          />
          <TextEdit
            showInput={showUserNameInput}
            setShowInput={setShowUserNameInput}
            onSubmitFn={() => {}}
            values={userData?.username}
            setValues={(v) => setUserData({ ...userData, username: v })}
            submitLoading={false}
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
          ) : <p className="text-green-500 mx-auto flex items-center justify-center gap-2 mt-2"><BadgeCheck />Verified User</p>}
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UserProfileModal;
