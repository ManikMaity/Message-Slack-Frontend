import { useEffect, useState } from "react";

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
import { Label } from "@/components/ui/label";
import useModalInitialValueContext from "@/hooks/apis/context/useModalInitialValueContext";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";

function WorkspacePreferenceModal() {

  const { workspacePreferencesVlaue } = useModalInitialValueContext();
  const [values, setValues] = useState(workspacePreferencesVlaue);
  const {wsPreferenceModalOpen, setWsPreferenceModalOpen} = useModalOpenContext();

  useEffect(() => {
    setValues(workspacePreferencesVlaue);
  }, [workspacePreferencesVlaue]);

  return (
    <Dialog open={wsPreferenceModalOpen} onOpenChange={() => setWsPreferenceModalOpen(false)}>
    <DialogContent className="max-w-[600px] w-[95%]">
      <DialogHeader>
        <DialogTitle className="text-2xl">Prefrences</DialogTitle>
        <DialogDescription>
          Make changes to your workspace here.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={values?.name}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            value={values?.description}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  );
}

export default WorkspacePreferenceModal;
