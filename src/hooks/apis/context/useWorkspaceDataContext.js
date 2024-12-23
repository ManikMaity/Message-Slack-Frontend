import WorkspaceDataContext from "@/context/WorkspaceDataContext";
import { useContext } from "react";

function useWorkspaceDataContext() {
  const { workspaceData, setWorkspaceData } = useContext(WorkspaceDataContext);

  return { workspaceData, setWorkspaceData };
}

export default useWorkspaceDataContext;
