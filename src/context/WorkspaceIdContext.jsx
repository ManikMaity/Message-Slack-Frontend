import { createContext, useState } from "react";

const WorkspaceIdContext = createContext(null);

export const WorkspaceIdProvider = ({ children }) => {
  const [workspaceId, setWorkspaceId] = useState("");

  return (
    <WorkspaceIdContext.Provider value={{ workspaceId, setWorkspaceId }}>
      {children}
    </WorkspaceIdContext.Provider>
  );
};

export default WorkspaceIdContext;
