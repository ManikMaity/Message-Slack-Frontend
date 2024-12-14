import { createContext, useState } from "react";

const CreateWorkspaceContext = createContext(null);

export function CreateWorkspaceProvider({ children }) {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <CreateWorkspaceContext.Provider
      value={{ openCreateModal, setOpenCreateModal }}
    >
      {children}
    </CreateWorkspaceContext.Provider>
  );
}

export default CreateWorkspaceContext;
