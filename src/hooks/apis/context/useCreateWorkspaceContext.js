import { useContext } from "react";

import CreateWorkspaceContext from "@/context/CreateWorkspaceContext";

function useCreateWorkspaceContext() {
    return useContext(CreateWorkspaceContext);
}

export default useCreateWorkspaceContext;
