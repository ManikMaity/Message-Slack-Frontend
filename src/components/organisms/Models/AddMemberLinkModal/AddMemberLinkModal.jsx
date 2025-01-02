import { Copy, RefreshCcw, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

import Spinner from "@/components/molecules/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FRONTEND_URL } from "@/config/clientConfig";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";
import useWorkspaceDataContext from "@/hooks/apis/context/useWorkspaceDataContext";
import useChangeWorkspaceJoinCode from "@/hooks/apis/workspaces/useChangeWorkspaceJoinCode";
import { toast } from "@/hooks/use-toast";

function AddMemberLinkModal() {
  const { workspaceLinkModalOpen, setWorkspaceLinkModalOpen } =
    useModalOpenContext();

  const { workspaceData } = useWorkspaceDataContext();
  const [copied, setCopied] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const { changeJoinCodeMutateAsync, isPending } = useChangeWorkspaceJoinCode();

  function copyHandler() {
    navigator.clipboard.writeText(`${FRONTEND_URL}/workspace/join/${joinCode}`);
    setCopied(true);
    toast({
      title: "Join Link copied to clipboard",
      description: "Workspace join link copied to clipboard",
    });
  }

  async function refreshLinkHandler() {
    await changeJoinCodeMutateAsync({ workspaceId: workspaceData._id });
  }

  useEffect(() => {
    if (workspaceData) {
      setJoinCode(workspaceData.joinCode);
    }
  }, [workspaceData]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    return () => {};
  }, [copied]);

  return (
    <Dialog
      open={workspaceLinkModalOpen}
      onOpenChange={() => setWorkspaceLinkModalOpen(false)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Workspace link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to join your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center flex-col space-y-2">
          <div className="w-full">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              value={`${FRONTEND_URL}/workspace/join/${joinCode}`}
              readOnly
            />
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button size="sm" onClick={copyHandler}>
              <span>Copy</span>
              {copied ? <ThumbsUp /> : <Copy />}
            </Button>
            <Button size="sm" onClick={refreshLinkHandler} disabled={isPending}>
              {isPending ? <Spinner /> : <span>Change link</span>}
              {!isPending && <RefreshCcw />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddMemberLinkModal;
