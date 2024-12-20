import WorkspaceIdContext from "@/context/WorkspaceIdContext";
import { useContext } from "react";

function useWorkspaceIdContext() {
  const { workspaceId, setWorkspaceId } = useContext(WorkspaceIdContext);
  return { workspaceId, setWorkspaceId };
}

export default useWorkspaceIdContext;
