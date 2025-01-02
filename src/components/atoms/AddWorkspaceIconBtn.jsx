import { Plus } from "lucide-react";

import useCreateWorkspaceContext from "@/hooks/apis/context/useCreateWorkspaceContext";

import { Button } from "../ui/button";

function AddWorkspaceIconBtn() {

    const { setOpenCreateModal, openCreateModal } = useCreateWorkspaceContext();

  return (
    <Button onClick={() => setOpenCreateModal(true)} variant="outline" className="rounded-full h-11 w-11">
      <Plus />
    </Button>
  );
}

export default AddWorkspaceIconBtn;
