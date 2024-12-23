import { createContext, useState } from "react";

const WorkspaceDataContext = createContext(null);

export const WorkspaceDataContextProvider = ({ children }) => {
    const [workspaceData, setWorkspaceData] = useState(null);
    return (
        <WorkspaceDataContext.Provider value={{ workspaceData, setWorkspaceData }}>
            {children}
        </WorkspaceDataContext.Provider>
    );
};

export default WorkspaceDataContext;